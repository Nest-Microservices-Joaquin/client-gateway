import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

import { PaginationDto } from 'src/common/';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) // Inyectamos el microservicio de productos.
    private readonly productClient : ClientProxy // Es un estandar que el ms sea llamado client pero en este caso lo llamamos productClient para saber a que ms corresponde.
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto){
    return this.productClient.send({ cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ){
    return this.productClient.send({ cmd: 'find_all'},  paginationDto ) // Utilizamos send para emitir comunicacion y esperar una respuesta. En el primer argumento tenemos que enviar el pattern tal cual este en el ms.
  }

  @Get(':id')
  async findOne(@Param('id') id: string){

    try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'find_one'}, { id })
      )
      return product

        // Manejo de errores trabajando con promesas.
    } catch (error) {
      throw new RpcException(error) // En vez de manejar las excepcions en el controlador se la enviamos a nuestro custom exception filter que creamos.
    }
    
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    return this.productClient.send({ cmd: 'update_product'}, {
      id,
      ...updateProductDto
    }).pipe(
      catchError( err => { throw new RpcException(err)})  // Esta es otra forma de manejar los errores trabajando con observables.
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productClient.send({ cmd: 'delete_product'}, {id}).pipe(
      catchError( err => {
         throw new RpcException(err)
        })
    )
  }
}
