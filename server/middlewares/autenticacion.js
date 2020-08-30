const jwt = require('jsonwebtoken');
const { listIndexes } = require('../models/usuario');


//==================
//Verificar Token
//==================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err

            });
        }

        //el decode.usuario contiene los datos del usuario que insertamos en el payload cuando hicimos el login
        req.usuario = decode.usuario;
        next();

    });



};

let validarRoleAdmin = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err

            });
        }

        //el decode.usuario contiene los datos del usuario que insertamos en el payload cuando hicimos el login

        req.usuario = decode.usuario;
        if (req.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(400).json({
                ok: false,
                err: 'El usuario no es administrador'

            });
        }

    });

};

module.exports = {
    verificaToken: verificaToken
        //  validarRoleAdmin: validarRoleAdmin
}