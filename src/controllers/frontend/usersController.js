
// Controlador para registrar un nuevo usuario
module.exports = {
  showProfile: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/profile", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: req.user  // Datos del usuario decodificados del JWT,
    });
  },

};
