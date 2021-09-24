export const queries= {
    getAllUsers:'SELECT * FROM usuarios',
    addNewUser:'INSERT INTO usuarios(nombre,correo,contraseña) VALUES (@name,@address,@contraseña)',
    getUserById :'SELECT * FROM usuarios WHERE id=@id',
    deleteUserById :'DELETE FROM usuarios WHERE id=@id',
    updateUserById :'UPDATE usuarios SET nombre=@name,correo=@address,contraseña=@contraseña WHERE id=@id'

}