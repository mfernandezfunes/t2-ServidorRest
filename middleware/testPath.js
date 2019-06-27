const EmailTemplates = require('swig-email-templates');
const nodemailer = require('nodemailer');
const fs = require('fs')
const icalendar = require('icalendar')
const path = require('path')

const gmail = {
    service: 'gmail',
    auth: {
        user: 'visitaServer@gmail.com',
        pass: 'ValoT1102!'
    }
}

const transporter = nodemailer.createTransport(gmail);
const templates = new EmailTemplates();
let context = {
    meatballCount: 9001
};
let html = `<h2>Su invitacion se encuentra adjunta</h2><p>No olvide presentar el codigo QR para ingresar</p>`
let text = 'Su invitacion se encuentra adjunta. No olvide presentar el codigo QR para ingresar'

let event = new icalendar.VEvent('cded25be-3d7a-45e2-b8fe-8d10c1f8e5a9');
event.setSummary("Ingreso al Parque Industrial");
event.setDate(new Date());
let content = event.toString();

let mensaje = {
    from: 'Sistema de Visitas <visitaServer@gmail.com>',
    to: 'Martin Fernandez <mfernandezfunes@gmail.com>',
    subject: "SU CODIGO QR DE INGRESO",
    html: html,
    text: text,
    icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: content
    },
    attachments: [{ // stream as an attachment
        filename: 'code.png',
        content: fs.createReadStream('../qr_codes/5d091989edc70b396c09d5b3.png')
    }]
}

templates.render('meatball-sandwich.html', context, function (err, html, text, subject) {
// Send email
    transporter.sendMail(mensaje, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
});