'use strict'

let Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let controller = {
    registrarUsuario: function (req, res) {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const usuario = new Usuario();
                usuario.email = req.body.email;
                usuario.password = hash;
                usuario.nombre = req.body.nombre;
                usuario.apellido = req.body.apellido;
                usuario.isActive = true;
                usuario.fechaCreacion = new Date();

                usuario.save((err, usuarioStored) => {
                    if (err) return res.status(500).send({
                        error: `Error al guardar ${usuario}`
                    });
                    if (!usuarioStored) return res.status(404).send({
                        message: 'No se ha podido guardar el usuario'
                    })
                    console.log(`Se ha creado: ${usuarioStored}`)
                    return res.status(201).send({
                        usuario: usuarioStored
                    })
                });
            }
        });
    },
    loguearUsuario: function (req, res) {
        Usuario.findOne({
                email: req.body.email
            })
            .exec()
            .then(function (usuario) {
                bcrypt.compare(req.body.password, usuario.password, function (err, result) {
                    if (err) {
                        return res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    }
                    if (result) {
                        const JWTToken = jwt.sign({
                                email: usuario.email,
                                _id: usuario._id
                            },
                            'secret', {
                                expiresIn: '2h'
                            });
                        console.log(`Se ha autenticado correctamente TOKEN: ${JWTToken}`)
                        return res.status(200).json({
                            success: 'Bienvenido a la Autenticacions JWT',
                            token: JWTToken
                        });
                    }
                    console.log(`Error en intento de autenticacion`)
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });;
    }
};

module.exports = controller;