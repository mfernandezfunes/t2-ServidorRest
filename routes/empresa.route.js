'use strict'
let express = require('express');
let EmpresaController = require ('../controllers/empresa.controller');

let router = express.Router();

router.post('/', EmpresaController.saveEmpresa);

router.get('/listar', EmpresaController.getEmpresas);
router.get('/:id?', EmpresaController.getEmpresa); // ? es opcional el parametro
router.get('/search', EmpresaController.getEmpresaBy); //pasar JSON de busqueda solo una persona


router.put('/:id', EmpresaController.updateEmpresa);

router.delete('/:id', EmpresaController.removeEmpresa);

module.exports = router;