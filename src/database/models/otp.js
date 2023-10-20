// otpModel.js
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Otp", 
        {
      userId: {
        type: DataTypes.UUID,  // Ajusta el tipo de dato a UUID
        allowNull: false,
        references: {
          model: 'Users',  // Asume que tienes un modelo llamado 'Users'
          key: 'uuid'
        }
      },
      otpCode: {
        type: DataTypes.STRING(6),  // Asume un OTP de 6 dígitos
        allowNull: false
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    return Model;
};
