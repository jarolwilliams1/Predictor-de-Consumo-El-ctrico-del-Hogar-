// Calcula la regresión lineal (y = mx + b) y predice el consumo del mes 13
function calcularRegresion(consumos) {
    const n = consumos.length;
    const x = consumos.map((_, i) => i + 1);
    const y = consumos;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);

    const m = (sumXY - (sumX * sumY) / n) / (sumX2 - (sumX * sumX) / n);
    const b = (sumY / n) - m * (sumX / n);

    const prediccion = m * (n + 1) + b;

    let tendencia = "estable";
    if (m > 0) {
        tendencia = "alcista";
    } else if (m < 0) {
        tendencia = "bajista";
    }

    return {
        prediccion: prediccion.toFixed(2),
        pendiente: m.toFixed(4),
        tendencia
    };
}

module.exports = { calcularRegresion };
