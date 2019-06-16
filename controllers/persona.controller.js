'use strict'
const uniqueFilename = require('unique-filename')
const base64Img = require('base64-img');
let Persona = require('../models/persona.model');
let fs = require('fs');

let rutaBase = "/api/persona"

let controller = {
    savePersona: function (req, res) {
        console.log(`POSTING: ${rutaBase}${req.url}`)
        let persona = new Persona();

        let params = req.body;
        persona.dni = params.dni;
        persona.nombre = params.nombre;
        persona.apellido = params.apellido;
        persona.email = params.email;
        persona.fechaNac = params.fechaNac;
        persona.activo = params.activo;

        persona.save((err, personaStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!personaStored) return res.status(404).send({
                message: 'No se ha podido guardar la persona'
            })
            return res.status(200).send({
                persona: personaStored
            })
        });
    },
    getPersona: function (req, res) {
        console.log(`GETTING: ${rutaBase}${req.url}`)
        let personaId = req.params.id;

        if (personaId == null) return res.status(404).send({
            message: 'La persona no existe'
        });
        Persona.findById(personaId, (err, persona) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos. getPersona' + err
            });
            if (!persona) return res.status(404).send({
                message: 'La Persona no existe'
            });
            return res.status(200).send({
                persona
            });
        });
    },
    getPersonaBy: function (req, res) {
        console.log(`GETTING: ${rutaBase}${req.url}`)

        let personaBy = req.url;
        console.log(personaBy)
        if (personaBy.dni == null) return res.status(404).send({
            message: 'La persona no existe'
        });

        Persona.findOne(personaBy, (err, persona) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!persona) return res.status(404).send({
                message: 'La Persona no existe'
            });
            return res.status(200).send({
                persona
            });
        });
    },
    getPersonas: function (req, res) {
        console.log(`GETTING: ${rutaBase}${req.url}`)
        Persona.find({}).exec((err, personas) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos. getPersonas'
            });
            if (!personas) return res.status(404).send({
                message: 'No existen personas para mostrar'
            });
            return res.status(200).send({
                personas
            });
        })
    },
    updatePersona: function (req, res) {
        console.log(`PUTING: ${rutaBase}${req.url}`)
        let personaId = req.params.id;
        let update = req.body;
        // {new:true} devuelve el objeto actualizado sino el antiguo
        Persona.findByIdAndUpdate(personaId, update, {
            new: true
        }, (err, personaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!personaUpdated) return res.status(404).send({
                message: 'No existe la persona para actualizar'
            });
            return res.status(200).send({
                persona: personaUpdated
            });
        })
    },
    removePersona: function (req, res) {
        console.log(`DELETING: ${rutaBase}${req.url}`)
        let personaId = req.params.id;
        Persona.findOneAndRemove(personaId, (err, personaRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!personaRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la persona'
            });
            return res.status(200).send({
                persona: personaRemoved
            });
        })
    },
    uploadImage: function (req, res) {
        console.log(`PUTING: ${rutaBase}${req.url}`)
        let personaId = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];

            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];
            // chequeo que la extension del archivo sea de imagen sino lo borrooo
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Persona.findByIdAndUpdate(personaId, {
                    image: fileName
                }, {
                    new: true
                }, (err, personaUpdated) => {
                    if (err) return res.status(500).send({
                        message: 'La imagen no se ha subido.'
                    });
                    if (!personaUpdated) return res.status(404).send({
                        message: 'La persona no existe y no se ha subido la imagen'
                    });
                    return res.status(200).send({
                        files: personaUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: 'La extension no es valida'
                    })
                });
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
    uploadImageCam: function (req, res) {
        console.log(`PUTING: ${rutaBase}${req.url}`)
        let personaId = req.params.id
        let fileName = uniqueFilename('', 'web')
        let imagen = req.body.picture

        console.log(fileName)

        if ((personaId) && (imagen)) {
            try {
                base64Img.img(imagen, `uploads/`, `${fileName}`, function (err, filepath) {
                    if (err) {
                        throw err
                    }
                    else{
                        let fileSplit = filepath.split('\\')
                        let fileName = fileSplit[1]

                        Persona.findOneAndUpdate(personaId, {
                            image: fileName
                        }, {
                            new: true
                        }, (err, personaUpdated) => {
                            if (err) return res.status(500).send({
                                message: 'La imagen no se ha subido.'
                            });
                            if (!personaUpdated) return res.status(404).send({
                                message: 'La persona no existe y no se ha subido la imagen'
                            });
                            return res.status(200).send({
                                files: personaUpdated
                            });
                        });






                    }
                })

                console.log('Archivo actualizado Satisfactoriamente');
            } catch (err) {
                console.log(err)
            }


        } else {
            return res.status(500).send({
                message: 'La imagen no se ha subido.'
            });
        }
    }
};

module.exports = controller;