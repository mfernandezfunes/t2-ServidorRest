'use strict'
let express = require('express');
let EmpresaController = require ('../controllers/empresa.controller');

let router = express.Router();

router.post('/', EmpresaController.saveEmpresa);

router.get('/', EmpresaController.getEmpresas);
router.get('/:id', EmpresaController.getEmpresa);

router.put('/:id', EmpresaController.updateEmpresa);

router.delete('/:id', EmpresaController.removeEmpresa);

module.exports = router;