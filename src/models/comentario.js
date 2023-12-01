const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  tema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tema',
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
