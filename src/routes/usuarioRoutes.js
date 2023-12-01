// usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

// Configuración de la estrategia local
passport.use(new LocalStrategy(
    function(username, password, done) {
      // Lógica de autenticación
      Usuario.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Usuario no encontrado.' }); }
        if (!user.validarPassword(password)) { return done(null, false, { message: 'Contraseña incorrecta.' }); }
        return done(null, user);
      });
    }
  ));

// Inicialización de Passport
router.use(passport.initialize());
router.use(passport.session());

// Rutas para usuarios
router.get('/', usuarioController.obtenerUsuario);
router.post('/', usuarioController.registrarUsuario);
router.get('/:id', usuarioController.obtenerUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);


// Rutas de autenticación
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', passport.authenticate('local'), usuarioController.iniciarSesion);
router.get('/logout', usuarioController.cerrarSesion);

module.exports = router;
