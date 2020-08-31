// Using Node.js `require()`
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//var Portafolio = mongoose.model('Portafolio');

let Schema = mongoose.Schema;

let detalleProduco = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    fecha: {
        type: Date,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    imgPrincipal: {
        type: String,
        required: false
    },
    imgDetalle: {
        type: String,
        required: false
    },

    estado: {
        type: Boolean,
        required: [true, 'El estado es requerido']
    },
    precioCosto: {
        type: Number,
        require: true
    },
    precioVenta: {
        type: Number,
        require: true
    },
    utilidad: {
        type: Number,
        require: true
    },
    plazoFinanciamiento: {
        type: Number,
        require: true
    }
    //portafolio: { type: Schema.ObjectId, ref: "Portafolio" }
});

detalleProduco.plugin(uniqueValidator, { message: 'El campo {PATH} con el valor {VALUE}, ya fue registrado' });
module.exports = mongoose.model('DetalleProducto', detalleProduco);