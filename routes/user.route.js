'use strict'
let express = require('express');
let UserController = require ('../controllers/user.controller');

let router = express.Router();

router.post('/signup', UserController.registrarUsuario);
router.post('/signin', UserController.loguearUsuario);

module.exports = router;