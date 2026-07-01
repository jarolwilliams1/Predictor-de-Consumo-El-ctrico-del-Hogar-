const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars"); // Motor de Handlebars

const app = express();

// Configurar Handlebars como el motor de vistas
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares esenciales para leer formularios (POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS/Bootstrap)
app.use(express.static(path.join(__dirname, "public")));

// Cargar las rutas
const homeRouter = require("./routers/home");
app.use("/", homeRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));