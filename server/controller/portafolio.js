const express = require('express');
const jwt = require('jsonwebtoken');
const Portafolio = require('../models/portafolio.js');
const DetallePortafolio = require('../models/detallePortafolio');
const { verificaToken } = require('../middlewares/autenticacion.js')
const { string } = require('yargs');
const { json } = require('body-parser');

const app = express();


app.get('/portafolio', [verificaToken], function(req, res) {

    let idUsuario = req.usuario.id;

    console.log(req.usuario);

    Portafolio.find({ usuario: idUsuario }, (err, portafolioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (Object.entries(portafolioBD).length == 0) {
            return res.status(400).json({
                ok: false,
                err: 'Este usuario no tiene portafolio'
            });
        }
        //Cuento la cantidad de usuarios de base de datos

        res.json({
            ok: true,
            usuario: req.usuario,
            portafolios: portafolioBD
        });


    });
});


//obtiene el portafolio y detalle de un usuario
app.get('/detallePortafolio', function(req, res) {

    let idUsuario = req.query.idUsuario;

    Portafolio.find({ usuario: idUsuario }, (err, portafolioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (Object.entries(portafolioBD).length == 0) {
            return res.status(400).json({
                ok: false,
                err: 'Este usuario no tiene portafolio'
            });
        }
        // let resultado = JSON.stringify(portafolioBD);



        const portafolio = portafolioBD.map(function(p) {
            return p._id;
        });


        DetallePortafolio.find({ portafolio: portafolio[0] }, (err, detallePortafolioBD) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (Object.entries(portafolioBD).length == 0) {
                return res.status(400).json({
                    ok: false,
                    err: 'Este portafolio no tiene detalle'
                });
            }

            res.json({
                ok: true,
                portafolio: portafolioBD,
                detallePortafolio: detallePortafolioBD
            });
        });

    });
});



app.post('/portafolio', function(req, res) {
    console.log(req.body);
    let body = req.body;

    //Creo un objeto del modelo Usuario y le asigno los valores enviados desde el cliente
    let portafolio = new Portafolio({
        descripcion: body.descripcion,
        img: body.img,
        estado: body.estado,
        usuario: body.usuario,
    });

    //Asi se envia  aguardar a base de datos el modelo completo
    portafolio.save((err, portafolioBD) => {

        //Si hay un error en la insercion, devuelvo un bat request con el error 400
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        //aqui personalizo lo que deseo devolover despues de la insercion
        let portafolioCreado = {
            descripcion: portafolioBD.descripcion,
            img: portafolioBD.img,
            estado: portafolioBD.estado,
            usuario: portafolioBD.usuario,
        }

        res.json({
            ok: true,
            usuario: portafolioCreado
        });

    });

});



app.post('/detalleportafolio', function(req, res) {

    let body = req.body;

    //Creo un objeto del modelo Usuario y le asigno los valores enviados desde el cliente
    let detallePortafolio = new DetallePortafolio({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: new Date().getFullYear(),
        link: body.link,
        img: body.img,
        estado: body.estado,
        portafolio: body.portafolio,
    });

    console.log(detallePortafolio);

    Portafolio.findOne({ _id: detallePortafolio.portafolio }, (err, portafolioEncontrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!portafolioEncontrado) {
            return res.status(400).json({
                ok: false,
                err: 'El portafolio seleccionado no existe'
            });
        }
        //Cuento la cantidad de usuarios de base de datos
        detallePortafolio.save((err, detallePortafolioBD) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                detallePortafolioBD: detallePortafolioBD
            });
        });

    });

});



module.exports = app;