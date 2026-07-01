// Calcula el porcentaje de variación entre consumos consecutivos
function calcularVariacion(consumos) {
    const variaciones = [];

    for (let i = 0; i < consumos.length; i++) {
        if (i === 0) {
            variaciones.push({ mes: i + 1, valor: "n/a" });
            continue;
        }

        const anterior = consumos[i - 1];
        const actual = consumos[i];

        if (anterior === 0) {
            variaciones.push({ mes: i + 1, valor: "No calculable" });
            continue;
        }

        const variacion = ((actual - anterior) / anterior) * 100;
        variaciones.push({ mes: i + 1, valor: variacion.toFixed(2) + "%" });
    }

    const soloNumeros = variaciones
        .filter(v => !isNaN(parseFloat(v.valor)))
        .map(v => parseFloat(v.valor));

    const promedioVariacion = soloNumeros.reduce((a, b) => a + b, 0) / soloNumeros.length;

    let tendencia = "estable";
    if (promedioVariacion > 1) {
        tendencia = "aumentando";
    } else if (promedioVariacion < -1) {
        tendencia = "disminuyendo";
    }

    return {
        variaciones,
        promedioVariacion: promedioVariacion.toFixed(2),
        tendencia
    };
}

module.exports = { calcularVariacion };
