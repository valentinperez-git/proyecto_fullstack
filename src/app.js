const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const usuarioRoutes = require('./usuarioRoutes'); // Asegúrate de tener el archivo de rutas adecuado

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Conecta a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define el modelo de usuario con passportLocalMongoose
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

// Configura Passport para la autenticación
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configura las rutas de usuario
app.use('/usuarios', usuarioRoutes);

// Exporta la instancia de la aplicación Express
module.exports = { app };
