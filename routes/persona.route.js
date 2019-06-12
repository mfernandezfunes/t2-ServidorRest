'use strict'
let express = require('express');
let PersonaController = require ('../controllers/persona.controller');

let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads'});

router.post('/', PersonaController.savePersona);
router.post('/:id/foto/', multipartMiddleware, PersonaController.uploadImage);
// patch ver para actualizar un campo

router.get('/listar', PersonaController.getPersonas);
router.get('/:id?', PersonaController.getPersona); // ? es opcional el parametro
router.get('/buscar/:dni', PersonaController.getPersonaBy); //pasar JSON de busqueda solo una persona


router.put('/:id', PersonaController.updatePersona);

router.delete('/:id', PersonaController.removePersona);

module.exports = router;