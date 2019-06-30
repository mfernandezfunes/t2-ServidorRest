'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = Schema({
	dni: {type: String, trim: true, required: true},
	nombre: {type: String, trim: true, required: true},
	apellido: {type: String, trim: true, required: true},
	email: {type: String, lowercase: true, trim: true},
	genero: String,
	fechaNac: String,
	activo: Boolean,
	image: String,
	fechaCreacion: {type: Date},
	fechaModificacion: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Persona', PersonaSchema);