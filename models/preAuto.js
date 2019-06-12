'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreAutorizadoSchema = Schema({
	dniPersona: String,
	cuitEmpresa: String,
	fechaIni: String,
	fechaFin: String,
	observaciones: String
});

module.exports = mongoose.model('PreAutorizado', PreAutorizadoSchema);