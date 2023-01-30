const ws = new WebSocket('ws://localhost:8080');
const chatUI = document.querySelector('.chat-list');

ws.onmessage = (message) => {
  const messages = JSON.parse(message.data);
  messages.forEach((mes) => {
    const messageEl = document.createElement('li');
    messageEl.classList.add('chat-message');
    messageEl.innerHTML = `<div><p>${mes.userName}</p><p>${mes.newMessage}</p></div><p>${mes.date}</p>`;
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
