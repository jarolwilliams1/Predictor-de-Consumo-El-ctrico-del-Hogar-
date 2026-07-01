const express = require("express");
const router = express.Router();

// Importar tus servicios de lógica de negocio
const { calcularSMA } = require("../services/sma");
const { calcularRegresion } = require("../services/regresionLineal");

// 1. Mostrar la página principal vacía
router.get("/", (req, res) => {
    res.render("home", { resultado: null });
});

// 2. Procesar el formulario enviado por el usuario
router.post("/calcular", (req, res) => {
    // Capturamos los datos del formulario (frontend)
    const consumos = req.body.consumos.map(Number); // Convertir strings a números
    const modoPrediccion = req.body.modo;

    // Validación obligatoria por requerimiento (exactamente 12 registros)
    if (!consumos || consumos.length !== 12 || consumos.some(isNaN)) {
        return res.render("home", { error: "El sistema debe validar que se ingresen exactamente 12 registros históricos válidos." });
    }

    let resultadoFinal = null;

    // Ejecución de la lógica de negocio exclusivamente en el servidor
    if (modoPrediccion === "SMA") {
        resultadoFinal = calcularSMA(consumos);
    } else if (modoPrediccion === "REGRESION") {
        resultadoFinal = calcularRegresion(consumos);
    }
    // ... agregar los demás modos (Variación, Tendencia) ...

    // Enviar la respuesta volviendo a renderizar 'home' inyectando el resultado
    res.render("home", { 
        resultado: resultadoFinal, 
        datosIngresados: consumos,
        modoSeleccionado: modoPrediccion 
    });
});

module.exports = router;