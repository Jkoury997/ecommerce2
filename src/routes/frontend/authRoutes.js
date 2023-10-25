const express = require('express');
const authController = require('../../controllers/frontend/authController');
const validatorAuth = require("../../validators/frontend/validatorAuth")
const validatorForm = require("../../middlewares/validatorForm")
const router = express.Router();


router.get('/register', authController.showRegister);
router.get('/login', authController.showLogin);

// Rutas públicas (no necesitan autenticación)
router.post('/register',validatorAuth.register,validatorForm.register, authController.register);
router.post('/login',validatorAuth.login,validatorForm.login, authController.login);
//Recupero de contraseña
router.get('/password-recovery', authController.showRecoveryForm);
router.post('/password-recovery', authController.generateAndSendOTP);


//cierre de session
router.get("/logout",authController.logout)




// Rutas protegidas (requieren autenticación)
const userRoutes = require("./userRoutes")
router.use('/users', userRoutes);

// ... cualquier otra ruta protegida que quieras agregar

module.exports = router;
