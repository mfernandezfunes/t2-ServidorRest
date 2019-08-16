'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
   nombre: {type: String,  trim: true},
   apellido: {type: String, trim: true},
   email: {type: String,  lowercase: true, trim: true,required: true},
   password: {type: String, required: true},
   isAdmin: {type: Boolean},
   isActive: {type: Boolean},
   lastSeen: {type: Date},
   fechaCreacion: {type: Date},
	fechaModificacion: {type: Date}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);