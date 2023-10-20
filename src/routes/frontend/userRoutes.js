const express = require('express');
const usersController = require('../../controllers/frontend/usersController');
const tokenMiddleware = require('../../middlewares/token');
const router = express.Router();

// Middleware para verificar el token en rutas protegidas
router.use(tokenMiddleware.verifyToken);

// Rutas protegidas (requieren autenticación)
// Ejemplo: obtener información del perfil del usuario
router.get('/profile', usersController.showProfile);

// ... cualquier otra ruta protegida que quieras agregar

module.exports = router;