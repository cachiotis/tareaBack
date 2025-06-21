const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    descripcion: {type: String, required: true},
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tarea', tareaSchema);