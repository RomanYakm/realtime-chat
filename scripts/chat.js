const ws = new WebSocket('ws://localhost:8080');
const chatUI = document.querySelector('.chat-list');

ws.onmessage = (message) => {
  const messages = JSON.parse(message.data);
  messages.forEach((mes) => {
    const messageEl = document.createElement('li');
    messageEl.appendChild(
      document.createTextNode(`${mes.userName}: ${mes.newMessage}`)
    );
    chatUI.appendChild(messageEl);
  });
};

const send = (event) => {
  event.preventDefault();
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
