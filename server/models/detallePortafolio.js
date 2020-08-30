// Using Node.js `require()`
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Portafolio = mongoose.model('Portafolio');

let Schema = mongoose.Schema;

let detallePortafolio = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es necesaria'],
        unique: false
    },
    link: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },

    estado: {
        type: Boolean,
        required: [true, 'El estado es requerido']
    },
    portafolio: { type: Schema.ObjectId, ref: "Portafolio" }
});

detallePortafolio.plugin(uniqueValidator, { message: 'El campo {PATH} con el valor {VALUE}, ya fue registrado' });
module.exports = mongoose.model('DetallePortafolio', detallePortafolio);