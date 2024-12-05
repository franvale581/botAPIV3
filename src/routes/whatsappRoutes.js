const express = require('express');
const whatsappController = require('../controllers/whatsappController');

const router = express.Router();
router.post('/', whatsappController.handleIncomingMessage);
router.get('/', whatsappController.verifyWebhook);

module.exports = router;
