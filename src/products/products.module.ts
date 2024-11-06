import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, // La propiedad name se refiere al nombre que tendra nuestro ms para poder utilizarlo o inyectarlo donde se requiera. En este caso creamos una constante para asegurar el tipado.
        transport: Transport.TCP, // transport es el protocolo de comunicacion con los ms (asegurarse de usar el mismo protocolo tanto en el ms como en el gateway.)
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        } }, 
    ]),
  ],
})
export class ProductsModule {}
