const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DatosFichajeSchema = Schema({
    idUsuario: { type: String, require: true },
    fecha: { type: Date, require: true },
    turnos: { type: Array, require: true },
})

module.exports = mongoose.model('DatosFichaje', DatosFichajeSchema);
