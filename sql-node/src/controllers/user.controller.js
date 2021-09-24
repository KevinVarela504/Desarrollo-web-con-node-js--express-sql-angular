import { connect } from "mssql";
import { getConnect, sql,queries } from "../database";
import{getToken,getTokenData} from '../config/jwt';
import{sendEmail,getTemplate} from '../config/mail';
import{decrypt,crypt} from '../config/encrypto';



export const getUsers= async (req,res)=>{
    try{
        const pool=  await getConnect();// la conexion nos retorna un pool
        const result= await pool.request().query(queries.getAllUsers);//con el pool hacemos la consulta await es porque se tarda bastante
        //console.log(result);
        res.json(result.recordset);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
   
};//reespuesta al recibir una peticion

 

export const createNewUser= async (req,res)=>{
    const {name, address,contraseña}= req.body;
    if(name==null ||address==null||contraseña==null){
        return res.status(400).json({msg:'por favor ingrese todos los campos'})//400 es campos incompletos
    }

    try{
        const contraseñaEncrypt=crypt(contraseña);
        const pool =await getConnect();
        const existe=await pool.request().input("address",sql.VarChar,address).query('SELECT * FROM usuarios WHERE correo=@address');
        if(existe.recordset.length==0){
        pool.request().input("name",sql.VarChar,name)
        .input("address",sql.VarChar,address)
        .input("contraseña",sql.VarChar,contraseñaEncrypt)
        .query(queries.addNewUser) //en input especificamos los tipos de datos y en query mandamos los parametros
        //console.log(name, address,contraseña);

        //generamos token
        const token= getToken({name,address,contraseñaEncrypt});
        

        //obtener template
         const template= getTemplate(name,token);
         
        //enviamos email
        await sendEmail(address,'este es un mensaje de prueba',template);

        //res.json('ingresando nuevo usuario');
        }
    
    res.json('ya existe');
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const confirm= async (req,res)=>{
    try {
        //obtener el token
        const {token} =req.params;
        //extraer la data que viene del token
        const data=await getTokenData(token);
        //verificar existencia del usuario

        //actualizar usuario

        //redireccionar a la confirmacion
        return res.redirect('/confirm.html');
        
        
    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}



export const getUserById= async (req,res)=>{
  const {id} =req.params;//req.params nos devuelve los parametros enviados por el usuario
  const pool= await getConnect();
  const result=await pool.request()
  .input("id",sql.Int,id)
  .query(queries.getUserById);
  res.json((await result).recordset);
  res.sendStatus(204);//para mandar jun mensaje que toda la operacion se realizo correctamente
};

export const deleteUserById = async(req,res)=>{
const{id}=req.params;
const pool = await getConnect();
pool.request()
.input("id",sql.Int,id)
.query(queries.deleteUserById);
res.sendStatus(204);
};

export const updateUser= async (req,res)=>{
  const {name, address, contraseña} = req.body;
  const {id}= req.params;
  if(name==null ||address==null||contraseña==null){
    return res.status(400).json({msg:'los campos no pueden ser null'})//400 es campos incompletos
   }
  
  try{
  const pool = await getConnect();
  await pool.request()
 .input("name",sql.VarChar,name)
 .input("address",sql.VarChar,address)
 .input("contraseña",sql.VarChar,contraseña)
 .input("id",sql.Int,id)
 .query(queries.updateUserById);
 res.json({id,name, address,contraseña})
 res.sendStatus(204);
  }catch(error){
   res.send(error.message)
  }
};

export const login = async (req,res)=>{
    const {address,contraseña}= req.body;
    const pool =await getConnect();
    const existe=await pool.request().input("address",sql.VarChar,address).query('SELECT contraseña FROM usuarios WHERE correo=@address');
    //traer elusuario de la base de datos por su email 
     console.log(existe.recordset);
    
    // desencryptar su contraseña
    contraseñaDesencrypt= decrypt(existe.recordset);
    //  comparar las contraseñas
    if(contraseñaDesencrypt!=contraseña){
        return res.status(400).json({msg:'usuario no encontrado'});//buscar el estado para contraseñas incorrectas
    }
    //retornar todo correctos
       // create token
       tokUser= getToken({address,contraseña});
    
       //envismos el token al usuario logueado
    res.header('auth-token', tokUser).json({
        error: null,
        data: {tokUser}
    });
}