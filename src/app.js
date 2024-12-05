require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const whatsappRoutes = require('./src/routes/whatsappRoutes');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas de WhatsApp
app.use('/whatsapp', whatsappRoutes);

// Exportar el servidor para Vercel
module.exports = app;
