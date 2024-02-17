import { Button, Input } from '../common';

export default () => {
  const page = document.createElement('div');
  const form = document.createElement('form');
  form.onsubmit = (event) => event.preventDefault();

  const chatContainer = document.createElement('div');
  if (window.dataChannel) {
    window.dataChannel.onmessage = (event) => {
      const message = document.createElement('div');
      message.innerText = `[${new Date().toUTCString()}]: ${event.data}`;
      message.style.color = 'grey';
      chatContainer.appendChild(message);
    };
  }
  const input = new Input().element;
  const sendButton = new Button('Send', () => {
    if (input.value) {
      const message = document.createElement('div');
      message.innerText = `[${new Date().toUTCString()}]: ${input.value}`;
      chatContainer.appendChild(message);

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
