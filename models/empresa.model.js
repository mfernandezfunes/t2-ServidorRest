'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
	cuit: String,
	nombre: String,
	email: String,
	piso: String,
	oficina: String,
	activa: Boolean
});

module.exports = mongoose.model('Empresa', EmpresaSchema);