const express = require('express');

//paquete de encriptacion de una sola via
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioBD) {
            return res.status(200).json({
                ok: false,
                message: '(Usuario) o contraseña incorrectos'
            });
        }


        if (bcrypt.compareSync(body.password, usuarioBD.password)) {

            //aqui personalizo lo que deseo devolover despues de la inservion
            let usuarioEncontrado = {
                id: usuarioBD._id,
                nombre: usuarioBD.nombre,
                email: usuarioBD.email,
                role: usuarioBD.role,
                estado: usuarioBD.estado,
                img: usuarioBD.img,
                profesion: usuarioBD.profesion
            }

            //configuracion de token
            var token = jwt.sign({ usuario: usuarioEncontrado }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            return res.status(200).json({
                ok: true,
                usuario: usuarioEncontrado,
                token: token
            });

        } else {
            return res.status(200).json({
                ok: false,
                message: 'Usuario o (contraseña) incorrectos'
            });
        }

    });

});

module.exports = app;