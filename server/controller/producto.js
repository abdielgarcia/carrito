const express = require('express');
const jwt = require('jsonwebtoken');
const Portafolio = require('../models/portafolio.js');
const DetalleProducto = require('../models/detalleProducto');
//const { verificaToken } = require('../middlewares/autenticacion.js')
const { string } = require('yargs');
const { json } = require('body-parser');
//const detalleProducto = require('../models/detalleProducto');

const app = express();


app.get('/productos1', function(req, res) {

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
app.get('/productos', function(req, res) {

    DetalleProducto.find((err, productosDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (Object.entries(productosDB).length == 0) {
            return res.status(400).json({
                ok: false,
                err: 'No existen productos'
            });
        }

        res.json({
            ok: true,
            productos: productosDB
        });
    });

});




app.post('/producto', function(req, res) {
    console.log(req.body);
    let body = req.body;

    //Creo un objeto del modelo Usuario y le asigno los valores enviados desde el cliente
    let producto = new DetalleProducto({

        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: body.fecha,
        link: body.link,
        imgPrincipal: body.imgPrincipal,
        imgDetalle: body.imgDetalle,
        estado: body.estado,
        precioCosto: body.precioCosto,
        precioVenta: body.precioVenta,
        utilidad: body.utilidad,
        plazoFinanciamiento: body.plazoFinanciamiento

    });

    console.log(producto);

    //Asi se envia  aguardar a base de datos el modelo completo
    producto.save((err, productoBD) => {

        //Si hay un error en la insercion, devuelvo un bat request con el error 400
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        //aqui personalizo lo que deseo devolover despues de la insercion
        let productoCreado = {
            nombre: productoBD.nombre,
            descripcion: productoBD.descripcion,
            fecha: productoBD.fecha,
            link: productoBD.link,
            imgPrincipal: productoBD.imgPrincipal,
            imgDetalle: productoBD.imgDetalle,
            estado: productoBD.estado,
            precioCosto: productoBD.precioCosto,
            precioVenta: productoBD.precioVenta,
            utilidad: productoBD.utilidad,
            plazoFinanciamiento: productoBD.plazoFinanciamiento
        }

        res.json({
            ok: true,
            usuario: productoCreado
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