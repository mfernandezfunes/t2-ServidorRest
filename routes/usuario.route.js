'use strict'
let express = require('express');
let UsuarioController = require ('../controllers/usuario.controller');

let router = express.Router();

router.post('/registrar', UsuarioController.registrarUsuario);
router.post('/loguear', UsuarioController.loguearUsuario);

module.exports = router;