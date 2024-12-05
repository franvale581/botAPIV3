Instructivo de Instalación
¡Gracias por adquirir nuestro bot de WhatsApp! Sigue estos simples pasos para instalar y configurar el proyecto.

Prerrequisitos
Antes de empezar, asegúrate de tener:

Node.js y npm: Descárgalos desde Node.js.

Editor de Texto: Te recomendamos Visual Studio Code.

Pasos de Instalación

1. Clonar el Repositorio
Abre tu terminal y ejecuta:

bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2. Instalar Dependencias
Dentro de la carpeta del proyecto, ejecuta:

bash
npm install

3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y añade:

plaintext

WHATSAPP_API_URL=https://graph.facebook.com/v13.0/your_whatsapp_business_account_id/messages
WHATSAPP_TOKEN=your_access_token

4. Iniciar la Aplicación
Para iniciar la aplicación, ejecuta:

bash
npm start

Deberías ver un mensaje indicando que el servidor está corriendo.

¡Y eso es todo!