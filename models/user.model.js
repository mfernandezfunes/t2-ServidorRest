'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {type: String, required: true},
   password: {type: String, required: true},
   fechaCreacion: {type: Date},
	fechaModificacion: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);