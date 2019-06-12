'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitaSchema = Schema({
	idEmpresa: String,
	idPersona: String,
	fechaEntrada: Date,
	fechaSalida: Date,
	numeroTarjeta: String,
	observaciones: String
});

module.exports = mongoose.model('Visita', VisitaSchema);