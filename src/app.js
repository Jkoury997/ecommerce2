// Importa las dependencias necesarias
const express = require("express");
const app = express();  // Crea una nueva instancia de una aplicación Express
const path = require("path");  // Proporciona utilidades para trabajar con rutas de archivos
const methodOverride = require("method-override");  // Permite usar verbos HTTP como PUT o DELETE en lugares donde el cliente no lo admite
const session = require("express-session");  // Middleware de sesión para Express
const cookieParser = require('cookie-parser');
const PORT = 3000;

// Configuración de middlewares
app.use(express.static(path.join(__dirname, "../public")));  // Sirve archivos estáticos desde la carpeta 'public'
app.use(methodOverride("_method"));  // Usa method-override con el query value _method
app.use(express.json());  // Parsea solicitudes con payloads JSON
app.use(express.urlencoded({ extended: false }));  // Parsea solicitudes con payloads URL-encoded
app.use(
  session({  // Configura el middleware de sesión
    secret: "MkOnline",  // Secreto utilizado para firmar la sesión ID cookie
    resave: false,  // Fuerza a guardar la sesión incluso si no fue modificada
    saveUninitialized: false,  // Fuerza a guardar una sesión no inicializada
  })
);
app.use(cookieParser());

// Importación y uso de rutas
const mainRouter = require("./routes/mainRoutes");
app.use("/", mainRouter);  // Usa las rutas definidas en 'mainRouter'

// Configuración del motor de plantillas
app.set("view engine", "ejs");  // Establece EJS como el motor de plantillas
app.set("views", path.join(__dirname, "/views"));  // Define la ubicación de la carpeta de las vistas

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});

const { Sequelize } = require("sequelize");
const config = require("./database/config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Intenta autenticarse con la base de datos y sincronizar los modelos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
    return sequelize.sync({ alter: true }); // Utiliza 'alter' para actualizar las tablas si hay cambios en los modelos
  })
  .then(() => {
    console.log("Las tablas han sido sincronizadas.");
  })
  .catch((err) => {
    console.error("No se pudo conectar o sincronizar con la base de datos:", err);
  });
