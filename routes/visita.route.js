'use strict'
let express = require('express');
let VisitaController = require ('../controllers/visita.controller');

let router = express.Router();

router.post('/', VisitaController.createVisita);

router.get('/', VisitaController.getVisitas);
router.get('/open', VisitaController.getVisitasOpen);
router.get('/:id', VisitaController.getVisita); 


router.put('/:id', VisitaController.updateVisita);

router.put('/:id/close', VisitaController.closeVisita);

router.delete('/:id', VisitaController.removeVisita); // no debe dejar borrar

module.exports = router;