import app from './app,';
//import bd from './database/conection';
app.listen(app.get('port'));
console.log("escuchamdo en el puerto",app.get('port'));