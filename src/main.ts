import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger= new Logger('Main-Gateway')

  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );

    app.useGlobalFilters(new RpcCustomExceptionFilter()) // Usaremos este custom filter de manera global en nuestra app.


  await app.listen(envs.port);

  console.log('hola mundo - primer cambio');
  
  logger.log(`Gateway running on port ${envs.port}`)
}
bootstrap();
