const qr = require('qr-image')
const fs = require('fs')

let pathQR = "../qr_codes/"

async function genQR(codigo) {
    let qr_png = await qr.image("http://localhost:8080/visita-form?id="+codigo, {
        type: 'png'
    });
    await qr_png.pipe(fs.createWriteStream(`${pathQR}${codigo}.png`));
}
async function genQR1(codigo) {
    let qr_png = await qr.image("WIFI:S:VALOT-Privada;T:WPA;P:arquimedes1250;;", {
        type: 'png'
    });
    await qr_png.pipe(fs.createWriteStream(`${pathQR}${codigo}.png`));
}

genQR1("5d091989edc70b396c09d5bssss3")

//module.exports = genQR;