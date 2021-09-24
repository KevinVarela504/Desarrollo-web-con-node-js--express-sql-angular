import  nodemailer from 'nodemailer';

const mail={
    user:'desarrolladorkevin@gmail.com',
    pass:'Ge1potato'
};

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls:{rejectUnauthorized:false},
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  });
  //tls:{rejectUnauthorized:false}
  //subject asunto , email del destinatario. y plantilla html

  export const sendEmail =async (email,subject,html)=>{
      try {
            
            await transporter.sendMail({
            from: `Kevin<${mail.user}>` , // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "registro realizado con exito", // plain text body
            html});// html body
            console.log('se envio el correo');
      } catch (error) {
          console.log('algo a salido mal al enviar el correo',error)
      }

  }

 export const getTemplate=(name,token)=>{
   return ` <head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    <img src="https://i.imgur.com/eboNR82.png" alt="">
    <h2>Hola ${name}</h2>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href="http://localhost:3000/api/user/confirm/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>`
 }

 //export default {sendEmail,getTemplate}