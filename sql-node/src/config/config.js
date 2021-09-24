import {config} from 'dotenv';// config va intentar leer las variables de entrno del computador
config();

export default{
port: process.env.PORT|| 4000,
encriptacion:process.env.ENCRYPTACION
}

