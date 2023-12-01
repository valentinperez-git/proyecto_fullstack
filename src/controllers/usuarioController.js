const Usuario = require('../models/usuario');
const passport = require('passport');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    console.log('Creando nuevo usuario:', { nombre, email });
    const nuevoUsuario = new Usuario({ nombre, email, contrasena });
    const usuarioGuardado = await nuevoUsuario.save();
    console.log('Usuario guardado:', usuarioGuardado);
    res.json(usuarioGuardado);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

// Iniciar sesión
exports.iniciarSesion = (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Inicio de sesión fallido' });
    }
    req.logIn(usuario, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    });
  })(req, res, next);
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
  req.logout();
  res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
};

// Obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

// Actualizar usuario por ID
exports.actualizarUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const { nombre, email, contrasena } = req.body;

  try {
    // Verifica si usuario existe
    const usuarioExistente = await Usuario.findById(usuarioId);

    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualiza los campos de usuario
    usuarioExistente.nombre = nombre || usuarioExistente.nombre;
    usuarioExistente.email = email || usuarioExistente.email;
    usuarioExistente.contrasena = contrasena || usuarioExistente.contrasena;

    // Guarda cambios en base de datos
    const usuarioActualizado = await usuarioExistente.save();

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// Elimina un usuario por ID
exports.eliminarUsuario = async (req, res) => {
  const usuarioId = req.params.id;

  try {
    // Busca el usuario en la base de datos
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Elimina el usuario
    await usuario.remove();

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};

