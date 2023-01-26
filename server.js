import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

const clients = {};
const wss = new WebSocketServer({ port: 5500 });
wss.on('connection', (ws) => {
  const id = uuid();
  clients[id] = ws;
  console.log(`new client ${id}`);
  console.log('connected');
  ws.on('error', console.error);

  ws.on('message', (rawMessage) => {});

  ws.on('close', () => {
    delete clients[id];
    console.log(`Client is close ${id}`);
  });
});
console.log('server running');
