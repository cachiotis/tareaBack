const express = require('express');
const mongoose = require('mongoose');
const tareasRoutes = require('./routes/tareas');
const dotenv = require('dotenv'); // Importar dotenv para manejar variables de entorno
const path = require('path');
const app = express();

const cors = require('cors');
const corsOptions = {
    origin: 'https://tarea-front.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

// Cargar variables de entorno desde .env
dotenv.config();
// Middleware para parsear JSON
// Asegúrate de tener esto antes de tus rutas
app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear form data
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/public/')));

// Conectar a MongoDB usando MONGO_URI desde .env
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error conectando a MongoDB:', err));

app.use('/tareas', tareasRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Usar el puerto de .env o 3000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});