import jwt from 'jsonwebtoken';

export const getToken =(payload)=>{
    return jwt.sign({data:payload},'secret',{expiresIn:'1h'});//la contraseña ponerka en el archivo.env para que quede oculta
}

export const getTokenData=(token)=>{
let data=null;
jwt.verify(token,'secret',(err,decoded)=>{
    if(err){
     console.log('error al obtener data del token');
    }else{
        data=decoded;
    }
});
return data;
}

//export default {getToken,getTokenData};