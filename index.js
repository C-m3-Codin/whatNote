const fs = require('fs');
const SESSION_FILE_PATH = './session.json';
let sessionData;
const qrcode = require('qrcode-terminal');
const {LocalAuth, Client, LegacySessionAuth } = require('whatsapp-web.js');
const messageHandler  = require('./messageHandler');




if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}


const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/brave-browser-stable',
      },
      authStrategy: new LocalAuth({
        clientId: "client-one"
      }),
      puppeteer: {
        headless: true,
      }
});

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {small: true});
}

);


client.on('authenticated', (session) => {
    sessionData = session;
    console.log(session)
    console.log("Authenticated !!!")

});






// session



client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',messageHandler);
client.initialize();

module.exports = client