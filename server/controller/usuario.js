const express = require('express');
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const app = express();

app.post('/usuario', function(req, res) {

    let body = req.body;

    //Creo un objeto del modelo Usuario y le asigno los valores enviados desde el cliente
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //utilizo un paquete para encriptar
        role: body.role,
        estado: body.estado,
        img: body.img,
        profesion: body.profesion
    });


    //Asi se envia  aguardar a base de datos el modelo completo
    usuario.save((err, usuarioBD) => {

        //Si hay un error en la insercion, devuelvo un bat request con el error 400
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //aqui personalizo lo que deseo devolover despues de la inservion
        let usuarioCreado = {
            nombre: usuarioBD.nombre,
            email: usuarioBD.email,
            role: usuarioBD.role,
            estado: usuarioBD.estado,
            img: usuarioBD.img,
            profesion: usuarioBD.profesion
        }

        res.json({
            ok: true,
            usuario: usuarioCreado
        });

    });

});

module.exports = app;