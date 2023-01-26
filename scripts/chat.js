import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:5500');
const chatUI = document.querySelector('.chat-window');
ws.onmessage = (message) => {};
const send = (event) => {
  const newMessage = document.querySelector('#message').value;
  const userName = document.querySelector('#name').value;
  ws.send(
    JSON.stringify({
      userName,
      newMessage,
    })
  );
  return false;
};
const formUISend = document.querySelector('.new-chat');
formUISend.addEventListener('submit', send);
