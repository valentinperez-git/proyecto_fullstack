const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Tema = mongoose.model('Tema', temaSchema);

module.exports = Tema;
