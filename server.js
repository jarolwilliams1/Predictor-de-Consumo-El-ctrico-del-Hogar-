const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Importar rutas apuntando a los nombres reales de tus archivos físicos
const home = require("./routers/home")

// ruta (mapeo de url)
app.use("/", home);

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
})
