'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3701
// Cargar archivos de rutas

let persona_routes = require('./routes/persona.route');
let empresa_routes = require('./routes/empresa.route');
let visita_routes = require('./routes/visita.route');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // origenes front permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas

app.use('/api/persona', persona_routes);
app.use('/api/empresa', empresa_routes);
app.use('/api/visita', visita_routes);


// exportar
module.exports = app;