// Using Node.js `require()`
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado es requerido']
    },

    profesion: {
        type: String,
        required: [true, 'La profesion es requerida']
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El campo {PATH} con el valor {VALUE}, ya fue registrado' });
module.exports = mongoose.model('Usuario', usuarioSchema);