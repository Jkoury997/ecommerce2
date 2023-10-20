const userService = require("../../services/frontend/userService");

// Controlador para registrar un nuevo usuario
module.exports = {
  showMenu: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    const userData = req.session.userData
    req.session.errors = null;
    req.session.oldData = null;
    
    res.render("frontend/auth/profile/menu", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: userData ? userData : null, // Datos del usuario decodificados del JWT,
    });
  },
  showProfile: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    const userData = req.session.userData
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/profile/account", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: userData ? userData : null  // Datos del usuario decodificados del JWT,
    });
  },
  account: async (req, res) => {
    try {

      function processPasswordFields() {
        // Si password es una cadena vacía, eliminamos ambos campos
        if (req.body.password === "") {
          delete req.body.password;
          delete req.body.confirmPassword;
        } else {
          // Si password tiene algún valor, eliminamos sólo confirmPassword
          delete req.body.confirmPassword;
        }
      }
      const { id } = req.user
      processPasswordFields() // Emilina password si no tiene nada

      await userService.updateUser(req.body, id);
      await userService.getUserData(id)
      console.log(userData)

      res.redirect("/users/profile")

    } catch (error) {
      
    }
  },
  showAddress: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    const userData = req.session.userData
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/profile/address", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: userData ? userData : null  // Datos del usuario decodificados del JWT,
    });
  },
  showAddNewAddress: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    const userData = req.session.userData
    req.session.errors = null;
    req.session.oldData = null;
    res.render("frontend/auth/profile/addNewAddress", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userData: userData ? userData : null  // Datos del usuario decodificados del JWT,
    });
  },
};
