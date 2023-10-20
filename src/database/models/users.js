const { v4: uuidv4 } = require('uuid');

// userModel.js
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Users",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv4(),
                allowNull: false,
                primaryKey: true
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            born: {
                type: DataTypes.DATE,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dni: {
                type: DataTypes.STRING(9),  // Asumiendo un formato de DNI específico, ajusta según tus necesidades
                allowNull: false,
                unique: true
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            tableName: "users",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return Model;
};
