// usuarioModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Método para validar la contraseña
usuarioSchema.methods.validarPassword = function (password) {
  return bcrypt.compareSync(password, this.contrasena);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
