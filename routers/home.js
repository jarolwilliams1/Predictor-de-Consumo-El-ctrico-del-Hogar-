const express = require("express");
const router = express.Router();

// Importar tus servicios de lógica de negocio
const { calcularSMA } = require("../services/sma");
const { calcularRegresion } = require("../services/regresionLineal");
const { calcularVariacion } = require("../services/variacionPorcentual");
const { calcularTendencia } = require("../services/deteccionTendencia");

// 1. Mostrar la página principal vacía
router.get("/", (req, res) => {
    res.render("home", { resultado: null });
});

// 2. Procesar el formulario enviado por el usuario
router.post("/calcular", (req, res) => {
    // Capturamos los datos del formulario (frontend)
    const fechas = req.body.fechas;
    const consumos = [].concat(req.body.consumos || []).map(Number); // Convertir strings a números
    const modoPrediccion = req.body.modo;

    // Validación obligatoria por requerimiento (exactamente 12 registros)
    if (!fechas || !req.body.consumos || fechas.length !== 12 || consumos.length !== 12 || consumos.some(isNaN) || fechas.some(f => !f)) {
        return res.render("home", { error: "El sistema debe validar que se ingresen exactamente 12 registros históricos válidos." });
    }

    let resultadoFinal = null;

    // Ejecución de la lógica de negocio exclusivamente en el servidor
    if (modoPrediccion === "SMA") {
        resultadoFinal = calcularSMA(consumos);
    } else if (modoPrediccion === "REGRESION") {
        resultadoFinal = calcularRegresion(consumos);
    } else if (modoPrediccion === "VARIACION") {
        resultadoFinal = calcularVariacion(consumos);
    } else if (modoPrediccion === "TENDENCIA") {
        resultadoFinal = calcularTendencia(consumos);
    }

    // Enviar la respuesta volviendo a renderizar 'home' inyectando el resultado
    res.render("home", {
        resultado: resultadoFinal,
        datosIngresados: consumos,
        modoSeleccionado: modoPrediccion
    });
});

module.exports = router;
