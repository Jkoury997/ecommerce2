const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    // Obtiene el token de la cookie 'auth_token'
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
      // Verifica el token
      const decoded = jwt.verify(token, 'SECRET_KEY');
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
    }
  }
};

