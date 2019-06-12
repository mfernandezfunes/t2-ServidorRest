"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "mfernandezfunes@icloud.com", // list of receivers
    subject: "Aviso de SALIDA", // Subject line
    text: "Se ha detectado que una visita no ha salido del edificio", // plain text body
    html: "<b>Se ha detectado que una visita no ha salido del edificio</b>" // html body
  });

  console.log("Mensaje enviado: %s", info.messageId);
  console.log("Vista preliminar: %s", nodemailer.getTestMessageUrl(info));

}

main().catch(console.error);