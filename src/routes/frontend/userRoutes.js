const express = require('express');
const usersController = require('../../controllers/frontend/usersController');
const tokenMiddleware = require('../../middlewares/token');
const validatorFormAccount = require('../../middlewares/validatorFormAccount');
const validatorAccount = require("../../validators/frontend/validatorAccount")
const router = express.Router();

// Middleware para verificar el token en rutas protegidas
router.use(tokenMiddleware.verifyToken);

// Rutas protegidas (requieren autenticación)
// Ejemplo: obtener información del perfil del usuario
router.get('/profile', usersController.showMenu);
router.get('/profile/account', usersController.showProfile);
router.post('/profile/account',validatorAccount.account,validatorFormAccount.account, usersController.account);


//Dirreciciones
router.get('/profile/address', usersController.showAddress);
router.get('/profile/addNewAddress', usersController.showAddNewAddress);


// ... cualquier otra ruta protegida que quieras agregar

module.exports = router;