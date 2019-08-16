'use strict'
let Empresa = require('../models/empresa.model');

let rutaBase = "/api/empresa"

let controller = {
    saveEmpresa: function (req, res) {
        console.log(`POSTING: ${rutaBase}${req.url}`)
        let empresa = new Empresa();

        let params = req.body;
        empresa.cuit = params.cuit;
        empresa.nombre = params.nombre;
        empresa.email = params.email;
        empresa.piso = params.piso;
        empresa.oficina = params.oficina;
        empresa.activa = true;
        empresa.fechaCreacion = new Date();

        empresa.save((err, empresaStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!empresaStored) return res.status(404).send({
                message: 'No se ha podido guardar la empresa'
            })
            return res.status(201).send({
                empresa: empresaStored
            })
        });
    },
    getEmpresa: function (req, res) {

        console.log(`GETTING: ${rutaBase}${req.url}`)

        let empresaId = req.params.id;

        if (empresaId == null) return res.status(404).send({
            message: 'La empresa no existe'
        });
        Empresa.findById(empresaId, (err, empresa) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!empresa) return res.status(404).send({
                message: 'La Empresa no existe'
            });
            return res.status(200).send({
                empresa
            });
        });
    },
    getEmpresas: function (req, res) {
        console.log(`GETTING QUERY: ${rutaBase}${req.url}`)

        let search = {}
        search = req.query

        Empresa.find(search).exec((err, empresas) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos. getEmpresas'
            });
            if (!empresas) return res.status(404).send({
                message: 'No existen empresas para mostrar'
            });
            return res.status(200).send({
                empresas
            });
        })
    },
    updateEmpresa: function (req, res) {
        console.log(`PUTTING: ${rutaBase}${req.url}`)
        let empresaId = req.params.id;
        let update = req.body;
        console.log(update)
        console.log(empresaId)
        // {new:true} devuelve el objeto actualizado
        Empresa.findOneAndUpdate(empresaId, update, {
            new: true
        }, (err, empresaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!empresaUpdated) return res.status(404).send({
                message: 'No se ha podido actualizar la empresa'
            });
            return res.status(200).send({
                empresa: empresaUpdated
            });
        })
    },
    removeEmpresa: function (req, res) {
        console.log(`DELETING: ${rutaBase}${req.url}`)
        let empresaId = req.params.id;
        Empresa.findOneAndRemove(empresaId, (err, empresaRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!empresaRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la empresa'
            });
            return res.status(204).send({
                empresa: empresaRemoved
            });
        })
    }
};

module.exports = controller;