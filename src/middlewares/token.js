const jwt = require('jsonwebtoken');
const { Users } = require('../database/models'); // Asegúrate de que esta ruta de importación sea correcta

module.exports = {
  verifyToken: async (req, res, next) => {
    // Obtiene el token de la cookie 'auth_token'
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
      // Verifica el token
      const decoded = jwt.verify(token, 'SECRET_KEY');
      req.user = decoded;
      
      // Busca al usuario en la base de datos con el ID del token
      const user = await Users.findByPk(decoded.id); // Asegúrate de que esté usando 'id' y no 'uuid' si es diferente en tu caso
      if (user) {
        req.session.userData = user.dataValues; // Guarda los datos del usuario en la sesión
      } else {
        return res.status(401).json({ message: 'Acceso denegado. Usuario no encontrado.' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
    }
  }
};
