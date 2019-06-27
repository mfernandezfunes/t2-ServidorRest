'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
	cuit: String,
	nombre: {type: String, trim: true},
	email: {type: String, lowercase: true, trim: true},
	piso: String,
	oficina: String,
	activa: Boolean,
	fechaCreacion: {type: Date},
	fechaModificacion: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Empresa', EmpresaSchema);