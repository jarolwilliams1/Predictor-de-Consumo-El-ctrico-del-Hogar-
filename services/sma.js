// Calcula el Promedio Móvil Simple con los últimos 3 consumos
function calcularSMA(consumos) {
    const ultimosTres = consumos.slice(-3);
    const promedio = ultimosTres.reduce((a, b) => a + b, 0) / 3;
    const ultimoConsumo = consumos[consumos.length - 1];

    let tendencia = "estable";
    if (ultimoConsumo > promedio) {
        tendencia = "alcista";
    } else if (ultimoConsumo < promedio) {
        tendencia = "bajista";
    }

    return {
        promedio: promedio.toFixed(2),
        consumoEstimado: promedio.toFixed(2),
        tendencia
    };
}

module.exports = { calcularSMA };
