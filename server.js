import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

const clients = {};
const messages = [];
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  const id = uuid();
  clients[id] = ws;
  console.log(`new client ${id}`);

  ws.send(JSON.stringify(messages));

  ws.on('error', console.error);

  ws.on('message', (rawMessage) => {
    const { userName, newMessage } = JSON.parse(rawMessage);
    messages.push({ userName, newMessage });
    Object.keys(clients).forEach(() => {
      clients[id].send(JSON.stringify([{ userName, newMessage }]));
    });
  });

  ws.on('close', () => {
    delete clients[id];
    console.log(`Client is close ${id}`);
  });
});
console.log('server running');
