const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 4000 });
const rooms = {
  general: [],
  random: [],
  "web-ft-cal-2019apr29": []
};
 
wss.on('connection', (ws) => {
  if (wss.clients.length > 10000) {
    ws.terminate();
  }
  console.log("Got a new connection!");
  ws.on('message', (message) => {
    if (message.length > 1024000) {
      return false;
    }
    console.log('received: %s', message);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
 
  ws.send(JSON.stringify({room: "general", msg: 'Welcome to the Chat Room', colour: 'black'}));
});
