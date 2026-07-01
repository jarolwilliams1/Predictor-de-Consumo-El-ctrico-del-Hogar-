// Analiza el comportamiento global comparando meses consecutivos
function calcularTendencia(consumos) {
    let sube = 0;
    let baja = 0;
    let estable = 0;

    for (let i = 1; i < consumos.length; i++) {
        if (consumos[i] > consumos[i - 1]) {
            sube++;
        } else if (consumos[i] < consumos[i - 1]) {
            baja++;
        } else {
            estable++;
        }
    }

    let tendencia = "estable";
    if (sube > baja && sube > estable) {
        tendencia = "alcista";
    } else if (baja > sube && baja > estable) {
        tendencia = "bajista";
    }

    return {
        sube,
        baja,
        estable,
        tendencia
    };
}

module.exports = { calcularTendencia };
