var nodemailer = require('nodemailer');
let confGMail = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'Oauth2',
        user: 'maffunes78@gmail.com',
        accessToken: ''
    }
}
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://martin.fernandez:921932@128.196.0.97');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Test" <maffunes78@gmail.com>', // sender address
    to: 'martin.fernandez@valot.com.ar, martin.funes@valot.com.ar', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});