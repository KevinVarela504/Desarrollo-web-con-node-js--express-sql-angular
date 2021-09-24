import express from 'express';
import config from './config/config';
import usersRoute from './routes/user.route'; //importando ruta de usuario
//import cookieParser from 'cookie-parser';
const app=express();


//settings
app.set('port',config.port || 3000);

//middlewars
app.use(express.static('./public'));//carpeta del front al archivo index.js
app.use(express.json());//para poder trabajar con jsons 
app.use(express.urlencoded({extended:false}));//para trabajar con datos que vienen de formularios

//trabajar con cookies
//app.use


//
app.use(usersRoute);
export default app;