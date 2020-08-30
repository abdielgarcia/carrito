// Using Node.js `require()`
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
var Usuario = mongoose.model('Usuario');
let portafolioSchema = new Schema({

    descripcion: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    img: {
        type: String,
        required: false
    },

    estado: {
        type: Boolean,
        required: [true, 'El estado es requerido']
    },
    usuario: { type: Schema.ObjectId, ref: "Usuario" }
});

portafolioSchema.plugin(uniqueValidator, { message: 'El campo {PATH} con el valor {VALUE}, ya fue registrado' });
module.exports = mongoose.model('Portafolio', portafolioSchema);