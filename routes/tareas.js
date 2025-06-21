const express = require('express');
const Tarea = require('../models/Tarea');
const router = express.Router();

// Crear una tareas (POST)
router.post('/', async (req, res) => {
    try {
        const tarea = new Tarea(req.body); // Crear un nuevo usuario con los datos del body
        await tarea.save(); // Guardar el usuario en la base de datos
        res.status(201).send(tarea); // Responder con el usuario creado
    } catch (err) {
        res.status(400).send({ error: err.message }); // Manejar errores de validación o duplicados
    }
});

// Obtener todos las tareas (GET)
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find(); 
        res.send(tareas); 
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener las tareas' }); // Manejar errores del servidor
    }
});

// Obtener una tarea por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id); 
        if (!tarea) {
        return res.status(404).send({ error: 'Tarea no encontrada' }); 
        }
        res.send(tarea);
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener la tarea' }); // Manejar errores del servidor
    }
});

module.exports = router;