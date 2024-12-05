const express = require('express');
const whatsappController = require('../controllers/whatsappController');

const router = express.Router();

// Ruta para la validación inicial del webhook
router.get('/', whatsappController.verifyWebhook);

// Ruta para manejar mensajes entrantes
router.post('/', whatsappController.handleIncomingMessage);

module.exports = router;
