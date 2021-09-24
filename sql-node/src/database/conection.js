import sql from 'mssql';//traernos el modulo de conexion de mysql
const dbSetting={//le especificamos que base de datos usuario y demas parametros
    user:'kevin',
    password:'Ge1potato1',
    server:'localhost',
    database:'ventas',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true ,// change to true for local dev / self-signed certs
        cryptoCredentialsDetails: {// me tiraba error por una version  de tlsv2 que no es compatible con sql server
            minVersion: 'TLSv1'
        }
      }
};

export async function getConnect(){
try {
const pool= await sql.connect(dbSetting);// .connect es asincrono  para eso almanesaremos en un pool cuando ya este conectaado con el cual haremos las queris o consultas
return pool;
}catch(error){
console.error(error);
}
};

export {sql};

//getConnect();
