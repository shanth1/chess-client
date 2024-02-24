import { connection } from '../app/connection';
import { Button, Input } from '../common';
import { getBoardModule } from '../modules';

const getMessageElement = (text) => {
  const message = document.createElement('div');
  message.innerText = `[${new Date().getHours()}:${new Date().getMinutes()}] ${text}`;
  message.style.fontSize = '24px';

  return message;
};

export default () => {
  const page = document.createElement('div');

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.justifyContent = 'center';
  form.style.padding = '20px';
  form.onsubmit = (event) => event.preventDefault();

  const chatContainer = document.createElement('div');
  chatContainer.style.padding = '0 16px';
  if (connection.dataChannel) {
    connection.dataChannel.addEventListener('message', (event) => {
      const message = JSON.parse(event.data).message;
      if (message) {
        const messageElement = getMessageElement(message);
        messageElement.style.color = 'grey';
        chatContainer.prepend(messageElement);
      }
    });
  }
  const input = new Input().element;
  const sendButton = new Button('Send', () => {
    if (input.value) {
      const messageElement = getMessageElement(input.value);
      chatContainer.prepend(messageElement);
      if (connection.dataChannel) {
        const dataPresentation = JSON.stringify({
          message: input.value,
        });
        connection.dataChannel.send(dataPresentation);
      }
      input.value = '';
    }
  }).element;

  page.appendChild(getBoardModule());
  form.appendChild(input);
  form.appendChild(sendButton);
  page.appendChild(form);
  page.appendChild(chatContainer);
  return page;
};
