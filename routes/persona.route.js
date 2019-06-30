'use strict'
let express = require('express');
let PersonaController = require ('../controllers/persona.controller');

let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads'});

router.post('/', PersonaController.savePersona);
router.post('/:id/foto/', multipartMiddleware, PersonaController.uploadImage);
router.post('/:id/webcam/', multipartMiddleware, PersonaController.uploadImageCam);

router.get('/', PersonaController.getPersonas);
router.get('/:id', PersonaController.getPersona);
router.get('/:id/foto', PersonaController.getPersonaFoto);

router.put('/:id', PersonaController.updatePersona);

router.delete('/:id', PersonaController.removePersona);

module.exports = router;