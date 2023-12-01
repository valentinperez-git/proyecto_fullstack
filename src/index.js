require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const usuarioRoutes = require('../src/routes/usuarioRoutes');

const app = express();

// Configuración de dotenv
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/proyectoDb';


// Conexión a MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para parsear datos en las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Maneja eventos de conexión y error
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');

  // Usar las rutas de usuarios
  app.use('/usuarios', usuarioRoutes);

  // Rutas y controladores para el foro
  app.get('/foro', async (req, res) => {
    // Obtener temas desde la base de datos (ejemplo)
    const temas = await Tema.find();
    res.render('temas', { temas });
  });

  app.get('/foro/:temaId', async (req, res) => {
    const { temaId } = req.params;
    // Obtener tema y comentarios desde la base de datos (ejemplo)
    const tema = await Tema.findById(temaId);
    const comentarios = await Comentario.find({ tema: temaId });
    res.render('detalleTema', { tema, comentarios });
  });

  app.get('/foro/:temaId/comentarios/nuevo', (req, res) => {
    const { temaId } = req.params;
    res.render('formularioComentario', { temaId });
  });

  app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
    console.log(`Accede a tu aplicación en http://localhost:${PORT}`);
  });
});
