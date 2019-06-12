'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = Schema({
	dni: String,
	nombre: String,
	apellido: String,
	email: String,
	genero: String,
	fechaNac: String,
	activo: Boolean,
	image: String
});

module.exports = mongoose.model('Persona', PersonaSchema);