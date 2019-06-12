'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = Schema({
	dni: String,
	nombre: String,
	apellido: String,
	genero: String,
	fechaNac: String,
	activo: Boolean,
	email: String,
	image: String
});

module.exports = mongoose.model('Persona', PersonaSchema);