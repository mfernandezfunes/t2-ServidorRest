    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://martin.fernandez:921932@128.196.0.97');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Test" <foo@blurdybloop.com>', // sender address
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