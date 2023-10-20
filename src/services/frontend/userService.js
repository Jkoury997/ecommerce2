const bcrypt = require("bcryptjs");
const {Users} = require("../../database/models");

module.exports = {
    updateUser: async function (updates,id) {

        try {
        
            const user = await Users.findByPk(id);
        
            if (!user) {
              return { message: 'Usuario no encontrado' };
            }
            Object.assign(user, updates);
            console.log(user)
            await user.save();
        
            return { message: 'Usuario actualizado exitosamente' };
          } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            return { error: 'Error al actualizar el usuario' };
          }
    },
    getUserData: async function(id) {

      try {
      
          const user = await Users.findByPk(id);
      
          if (!user) {
            return { message: 'Usuario no encontrado' };
          }
      
          return user;
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
          return { error: 'Error al actualizar el usuario' };
        }

    }
}