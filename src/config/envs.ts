
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {  // Agregamos tipado a las variables de entorno.
    PORT: number
    NATS_SERVERS: string[]
}

const envSchema = joi.object({ // Validaciones para las variables de entorno.
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
})
.unknown(true)

const { error, value } = envSchema.validate({ // Evaluamos las respecitvas validaciones.
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',') 
}) 

if( error ){
    throw new Error(`Config validation error: ${ error.message }`)
}

const envVars : EnvVars = value // Le asignamos el tipado de las variables de entorno al objeto value.

export const envs = {   // Exportamos dichas variables.
    port : envVars.PORT,
    natsServers: envVars.NATS_SERVERS
}