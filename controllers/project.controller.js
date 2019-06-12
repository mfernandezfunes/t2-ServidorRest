'use strict'

let Project = require('../models/project');
let fs = require('fs');

let controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la Home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo o accion test del controlador project"
        })
    },
    saveProject: function (req, res) {
        let project = new Project();

        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: "Error al guardar"
            });
            if (!projectStored) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto'
            })
            return res.status(200).send({
                project: projectStored
            })
        });
    },
    getProject: function (req, res) {
        let projectId = req.params.id;

        if (projectId == null) return res.status(404).send({
            message: 'El projecto no existe'
        });
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!project) return res.status(404).send({
                message: 'El projecto no existe'
            });
            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function (req, res) {

        Project.find({}).sort('-year').exec((err, projects) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });
            if (!projects) return res.status(404).send({
                message: 'No existen proyectos para mostrar'
            });
            return res.status(200).send({
                projects
            });
        })
    },
    updateProject: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;
        // {new:true} devuelve el objeto actualizado
        Project.findOneAndUpdate(projectId, update, {
            new: true
        }, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos.'
            });
            if (!projectUpdated) return res.status(404).send({
                message: 'No se ha podido actualizar el proyecto'
            });
            return res.status(200).send({
                project: projectUpdated
            });
        })
    },
    removeProject: function (req, res) {
        let projectId = req.params.id;
        Project.findOneAndRemove(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({
                message: 'Error borrar los datos.'
            });
            if (!projectRemoved) return res.status(404).send({
                message: 'No se ha podido borrar el proyecto'
            });
            return res.status(200).send({
                project: projectRemoved
            });
        })
    },
    uploadImage: function (req, res) {
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];

            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, {
                    image: fileName
                }, {
                    new: true
                }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({
                        message: 'La imagen no se ha subido.'
                    });
                    if (!projectUpdated) return res.status(404).send({
                        message: 'El proyecto no existe y no se ha subido la imagen'
                    });
                    return res.status(200).send({
                        files: projectUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: 'La extension no es valida'
                    })
                });
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    }  
};

module.exports = controller;