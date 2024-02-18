import { Button, Input } from '../common';

const getMessageElement = (text) => {
  const message = document.createElement('div');
  message.innerText = `[${new Date().toUTCString().split(' ')[4]}]: ${text}`;
  message.style.fontSize = '24px';

  return message;
};

export default () => {
  const page = document.createElement('div');
  const form = document.createElement('form');
  form.onsubmit = (event) => event.preventDefault();

  const chatContainer = document.createElement('div');
  if (window.dataChannel) {
    window.dataChannel.onmessage = (event) => {
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
      if (window.dataChannel) {
        dataChannel.send(input.value);
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
