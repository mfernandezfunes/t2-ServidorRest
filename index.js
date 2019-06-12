'use strict'
let mongoose = require('mongoose');
let app = require('./app');
let portApp = 3700;
let dbName = 'sistemaVisitas';

console.log("Iniciando ..");

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("Conexion a DB establecida con exito");
		//Creacion del servidor
		app.listen(portApp, () => {
			console.log(`Servidor corriendo correctamente en http://localhost:${portApp}`);
			console.log(`Esperando conexiones.. `);
		})
	})
	.catch(err => console.log(`Se ha producido un error en la conexion a la DB: ${err} `));
//npm run serve