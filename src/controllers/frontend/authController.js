const authService = require("../../services/frontend/authService");
const userService = require("../../services/frontend/userService");

// Controlador para registrar un nuevo usuario
module.exports = {
  showLogin: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/login", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: req.session.userData ? req.session.userData : null,
    });
  },
  showRegister: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/register", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: req.session.userData ? req.session.userData : null,
    });
  },
  register: async (req, res) => {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result); // 201 indica que se ha creado un recurso con éxito
    } catch (error) {
      if (
        error.message === "El email ya está en uso" ||
        error.message === "El DNI ya está registrado"
      ) {
        res.status(400).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error al registrar el usuario",
            error: error.message,
          });
      }
    }
  },
  // Controlador para iniciar sesión
  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      
      // Guarda el token en una cookie
      res.cookie('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo utiliza HTTPS en producción
        sameSite: 'strict', // Protege contra CSRF
        maxAge: 3600000 // Tiempo de vida de la cookie
      });
      res.redirect("/users/profile");
      
    } catch (error) {
      if (error.message === "Credenciales incorrectas") {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
      }
    }
},
logout: (req, res) => {
  // Eliminar la cookie que contiene el JWT
  res.clearCookie('auth_token');
  
  // Redirigir al usuario a la página de inicio o de inicio de sesión
  res.redirect('/login');
},
showRecoveryForm: (req, res) => {
  const errors = req.session.errors;
  const oldData = req.session.oldData;
  req.session.errors = null;
  req.session.oldData = null;
  res.render("frontend/auth/recoveryPassword", {
    errors: errors ? errors : null,
    oldData: oldData ? oldData : null,
    userData: req.session.userData ? req.session.userData : null,
  });
},
generateAndSendOTP: async  (req, res) => {
    const userEmail = req.body.email;  // Asume que tienes el correo electrónico del usuario en req.user

    try {
        const otpCode = await otpService.saveOTPForUser(userEmail);
        res.json({ message: 'OTP generado y enviado exitosamente por correo electrónico' });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar y enviar OTP', error: error.message });
    }
}

};
