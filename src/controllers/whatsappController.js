const axios = require('axios');

const agents = [
  { name: 'Agent 1', number: 'whatsapp:+5491100000000' },
  { name: 'Agent 2', number: 'whatsapp:+5491100000001' },
  { name: 'Agent 3', number: 'whatsapp:+5491100000002' },
];
let currentAgentIndex = 0;

// Verificar el webhook (validación inicial de Facebook)
exports.verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  return res.sendStatus(404);
};
// Manejar mensajes entrantes
exports.handleIncomingMessage = (req, res) => {
  const data = req.body;
  if (!data.entry || !data.entry[0].changes[0].value.messages) {
    return res.status(400).send('No se recibieron datos válidos.');
  }

  const messageType = data.entry[0].changes[0].value.messages[0].type;
  const from = data.entry[0].changes[0].value.messages[0].from;

  if (messageType === 'text') {
    const incomingMsg = data.entry[0].changes[0].value.messages[0].text.body;
    const currentAgent = agents[currentAgentIndex];

    // Enviar mensaje al agente actual
    axios.post(
      process.env.WHATSAPP_API_URL,
      {
        messaging_product: 'whatsapp',
        to: currentAgent.number,
        type: 'text',
        text: { body: `Nuevo mensaje de ${from}: ${incomingMsg}` },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    )
    .then(response => console.log(`Mensaje enviado con ID: ${response.data.messages[0].id}`))
    .catch(error => console.error(`Error enviando mensaje: ${error.message}`));

    res.status(200).send(`Gracias por contactarte con nosotros. Estás siendo redirigido a ${currentAgent.name}.`);
    
    // Cambiar al siguiente agente
    currentAgentIndex = (currentAgentIndex + 1) % agents.length;

  } else {
    res.status(400).send('Tipo de mensaje no manejado.');
  }
};
