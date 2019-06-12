const qr = require('qr-image')
const fs = require('fs')

let pathQR = "../qrcodes/"

async function genQR(codigo) {
    let qr_png = await qr.image(codigo, {
        type: 'png'
    });
    await qr_png.pipe(fs.createWriteStream(`${pathQR}${codigo}.png`));
}

genQR("CODIGO-DE-PREAUTORIZADO-PARA-CHECKIN-VISITA")

//module.exports = genQR;