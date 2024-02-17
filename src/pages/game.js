import { Button, Input } from '../common';

export default () => {
  const page = document.createElement('div');
  const form = document.createElement('form');
  const chatContainer = document.createElement('div');
  const input = new Input().element;
  const sendButton = new Button('Send', () => {
    if (input.value) {
      const message = document.createElement('div');
      message.innerText = `[${new Date().toUTCString()}]: ${input.value}`;
      input.value = '';
      chatContainer.appendChild(message);
    }
  }).element;

  form.appendChild(input);
  form.appendChild(sendButton);
  page.appendChild(form);
  page.appendChild(chatContainer);
  return page;
};
