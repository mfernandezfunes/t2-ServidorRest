'use strict'
let Visita = require('../models/visita.model');
let fs = require('fs');

let rutaBase = "/api/visita"

let controller = {
    createVisita: function (req, res) {

        console.log(`POSTING: ${rutaBase}${req.url}`)

        let visita = new Visita();
        let params = req.body;

        visita.idEmpresa = params.idEmpresa;
        visita.idPersona = params.idPersona;
        visita.fechaEntrada = params.fechaEntrada;
        visita.fechaSalida = params.fechaSalida; // pasar NULL en ingreso
        visita.numeroTarjeta = params.numeroTarjeta;
        visita.observaciones = params.observaciones;

        if ( (visita.idEmpresa == null) || (visita.idPersona == null) || (visita.fechaEntrada == null))
            return res.status(404).send({
                message: "Faltan datos"
            });

        visita.save((err, visitaStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!visitaStored) return res.status(404).send({
                message: 'No se ha podido guardar la visita'
            })
            return res.status(200).send({
                visita: visitaStored
            })
        });
    },
    getVisita: function (req, res) {

        console.log(`GETTING: ${rutaBase}${req.url}`)

        let visitaId = req.params.id;

        if (visitaId == null) return res.status(404).send({
            message: 'La visita no existe'
        });
        Visita.findById(visitaId, (err, visita) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!visita) return res.status(404).send({
                message: 'La Visita no existe'
            });
            return res.status(200).send({
                visita
            });
        });
    },
    getVisitas: function (req, res) {

        console.log(`GETTING: ${rutaBase}${req.url}`)

        Visita.find({}).sort('fechaEntrada').exec((err, visitas) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!visitas) return res.status(404).send({
                message: 'No existen visitas para mostrar'
            });
            return res.status(200).send({
                visitas
            });
        })
    },
    getVisitasOpen: function (req, res) {

        console.log(`GETTING: ${rutaBase}${req.url}`)

        Visita.find({
            fechaSalida: null
        }).exec((err, visitas) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!visitas) return res.status(404).send({
                message: 'No existen visitas para mostrar'
            });
            return res.status(200).send({
                visitas
            });
        })
    },
    updateVisita: function (req, res) {

        console.log(`PUTTING: ${rutaBase}${req.url}`)

        let visitaId = req.params.id;
        let update = req.body;
        // {new:true} devuelve el objeto actualizado
        Visita.findOneAndUpdate(visitaId, update, {
            new: true
        }, (err, visitaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!visitaUpdated) return res.status(404).send({
                message: 'No se ha podido actualizar la visita'
            });
            return res.status(200).send({
                visita: visitaUpdated
            });
        })
    },
    closeVisita: function (req, res) { // Actualizar fechaSalida con la del momento para cerrar la visita

        console.log(`PUTTING: ${rutaBase}${req.url}`)

        let visitaId = req.params.id;
        let update = req.body;
        // {new:true} devuelve el objeto actualizado
        Visita.findOneAndUpdate(visitaId, update, {
            new: true
        }, (err, visitaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!visitaUpdated) return res.status(404).send({
                message: 'No se ha podido actualizar la visita'
            });
            return res.status(200).send({
                visita: visitaUpdated
            });
        })
    },
    removeVisita: function (req, res) {
        
        console.log(`DELETING: ${rutaBase}${req.url}`)

        let visitaId = req.params.id;
        Visita.findOneAndRemove(visitaId, (err, vistaRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!visitaRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la visita'
            });
            return res.status(200).send({
                visita: visitaRemoved
            });
        })
    }
};

module.exports = controller;