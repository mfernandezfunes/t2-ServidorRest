'use strict'
let Empresa = require('../models/empresa.model');
let fs = require('fs');

let controller = {
    saveEmpresa: function (req, res) {
        let empresa = new Empresa();

        let params = req.body;
        empresa.cuit = params.cuit;
        empresa.nombre = params.nombre;
        empresa.piso = params.piso;
        empresa.oficina = params.oficina;
        empresa.activa = true;

        empresa.save((err, empresaStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!empresaStored) return res.status(404).send({
                message: 'No se ha podido guardar la empresa'
            })
            return res.status(200).send({
                empresa: empresaStored
            })
        });
    },
    getEmpresa: function (req, res) {
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
    getEmpresaBy: function (req, res) {
        let empresaBy = req.body.search;
        console.log(empresaBy)
        if (empresaBy == null) return res.status(404).send({
            message: 'La empresa no existe'
        });
        console.log(empresaBy)
        Empresa.findOne(empresaBy, (err, empresa) => {
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
        console.log(`POSTING: ${req.url}`)
        Empresa.find({}).exec((err, empresas) => {
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
        let empresaId = req.params.id;
        let update = req.body;
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
        let EmpresaId = req.params.id;
        Empresa.findOneAndRemove(empresaId, (err, empresaRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!empresaRemoved) return res.status(404).send({
                message: 'No se ha podido borrar la empresa'
            });
            return res.status(200).send({
                empresa: empresaRemoved
            });
        })
    }
};

module.exports = controller;