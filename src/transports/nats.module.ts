import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

// Creamos el modulo de nats para evitar hacer la conexion muchas veces.

@Module({
    imports: [
    ClientsModule.register([
        { 
          name: NATS_SERVICE, // La propiedad name se refiere al nombre que tendra nuestro ms para poder utilizarlo o inyectarlo donde se requiera. En este caso creamos una constante para asegurar el tipado.
          transport: Transport.NATS, // transport es el protocolo de comunicacion con los ms (asegurarse de usar el mismo protocolo tanto en el ms como en el gateway.)
          options: {
            servers: envs.natsServers
          } }, 
      ]),
    ],
    exports: [  // Aqui hay codigo "duplicado" pero es necesario ya que debemo exportar la configuracion de NATS para que otros modulos la utilicen.
        
    ClientsModule.register([
        { 
          name: NATS_SERVICE, 
          transport: Transport.NATS,
          options: {
            servers: envs.natsServers
          } }, 
      ]),
    ]
})
export class NatsModule {}
