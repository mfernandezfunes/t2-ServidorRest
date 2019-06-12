'use strict'
let express = require('express');
let ProjectController = require ('../controllers/project');

let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads'});

router.post('/project', ProjectController.saveProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

router.get('/project/:id?', ProjectController.getProject); // ? es opcional el parametro
router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/project/:id', ProjectController.removeProject);

module.exports = router;