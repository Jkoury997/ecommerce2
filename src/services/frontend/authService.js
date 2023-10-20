const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Users,Otp} = require("../../database/models");



// Función para registrar un usuario
module.exports = {
  register: async function (data) {
    try {
      const { firstname, lastname, email, born, password, dni } = data;

      // Verificar si el email ya existe
      const existingUserByEmail = await Users.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new Error("El email ya está en uso");
      }

      // Verificar si el DNI ya existe
      const existingUserByDNI = await Users.findOne({ where: { dni } });
      if (existingUserByDNI) {
        throw new Error("El DNI ya está registrado");
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario
      const newUser = await Users.create({
        firstname,
        lastname,
        email,
        born,
        password: hashedPassword,
        dni,
      });

      return { message: "Usuario registrado exitosamente", user: newUser };
    } catch (error) {
      throw error;
    }
  },

  // Función para iniciar sesión
  login: async function (data) {
    try {
      const { email, password } = data;

      // Buscar usuario por email
      const user = await Users.findOne({ where: { email } });

      // Si no se encuentra el usuario o la contraseña no coincide
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("Credenciales incorrectas");
      }

      // Generar token JWT
      const token = jwt.sign({
        id: user.uuid,
        email: user.email,
      }, 'SECRET_KEY', { expiresIn: '1h' });

      return { message: "Inicio de sesión exitoso", token };
    } catch (error) {
      throw error;
    }
  },
  saveOTPForUser: async function (userId) {
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    const otpCode = generateOTP();
    const expiryDate = new Date(Date.now() + 15*60*1000);

    const otpRecord = await OTPModel.create({
        userId: userId,
        otpCode: otpCode,
        expiryDate: expiryDate
    });

    return otpCode;
}
};
