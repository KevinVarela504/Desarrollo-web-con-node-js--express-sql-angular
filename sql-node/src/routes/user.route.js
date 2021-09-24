import {Router} from 'express';//importar Router  que nos va permitir crear urls
import {createNewUser, getUsers,getUserById,deleteUserById,updateUser,confirm} from '../controllers/user.controller';//importamos el get users para mandar la respuesta por aqui
const router=Router();// lo instanciamos

router.get('/users',getUsers);//aqui mandamos el get users que es la rspuesta a esta peticion
router.post('/api/users',createNewUser);//metodo post para ingresar un nuevo usuario
router.get('/users/:id',getUserById); // obtener usuario por id
router.delete('/users/:id',deleteUserById);//eliminar usuario por id
router.put('/users/:id',updateUser);
router.get('/api/user/confirm/:token',confirm); // obtener usuario por id


export default router;//nos permite definir rutas y exportarlas para ser usadas en otro archivo apps.js

