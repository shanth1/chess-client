import { connection } from '../app/connection';
import { Button, Input } from '../common';
import { Chess } from 'chess.js';

const getMessageElement = (text) => {
  const message = document.createElement('div');
  message.innerText = `[${new Date().getHours()}:${new Date().getMinutes()}]: ${text}`;
  message.style.fontSize = '24px';

  return message;
};

export default () => {
  const chess = new Chess();

  while (!chess.isGameOver()) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
  }
  console.log(chess.pgn());

  const page = document.createElement('div');

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.justifyContent = 'center';
  form.style.padding = '20px';
  form.onsubmit = (event) => event.preventDefault();

  const chatContainer = document.createElement('div');
  chatContainer.style.padding = '0 16px';
  if (connection.dataChannel) {
    connection.dataChannel.onmessage = (event) => {
      const message = getMessageElement(event.data);
      message.style.color = 'grey';
      chatContainer.prepend(message);
    };
  }
  const input = new Input().element;
  const sendButton = new Button('Send', () => {
    if (input.value) {
      const message = getMessageElement(input.value);
      chatContainer.prepend(message);
      if (connection.dataChannel) {
        connection.dataChannel.send(input.value);
      }
      input.value = '';
    }
  }).element;

  form.appendChild(input);
  form.appendChild(sendButton);
  page.appendChild(form);
  page.appendChild(chatContainer);
  return page;
};
