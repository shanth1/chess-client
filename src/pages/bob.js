import { Button } from '@/common';
import router from '../app/router';
import { connection } from '../app/connection';

const initConnection = (statusElement) => {
  connection.onOpen('bob', () => {
    router.navigate('game');
  });
  connection.onIceCandidate(() => {
    statusElement.innerText = 'Статус: создан offer';
  });
};

const getStatusElement = () => {
  const status = document.createElement('div');
  status.style.padding = '8px';
  status.style.fontSize = '22px';

  status.innerText = 'Статус:';

  return status;
};

export default () => {
  const page = document.createElement('div');
  const statusElement = getStatusElement();
  const logContainer = document.createElement('div');

  initConnection(statusElement);
  connection.initLogger(logContainer);
  connection.createOffer();

  const copyOffer = new Button('Copy', () => {
    const offer = connection.getLocalDescription();
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          console.log('copied');
          statusElement.innerText = 'Статус: скопировано, ожидаем answer';
        })
        .catch(console.error);
    }
  }).element;

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste');
        connection.setRemoteDescription(text);
      })
      .catch(console.error);
  }).element;

  page.appendChild(statusElement);
  page.appendChild(copyOffer);
  page.appendChild(pasteButton);
  page.appendChild(logContainer);

  return page;
};
