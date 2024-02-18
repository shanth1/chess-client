import { Button } from '@/common';
import router from '../app/router';
import { connection } from '../app/connection';

const getStatusElement = () => {
  const status = document.createElement('div');
  status.style.padding = '8px';
  status.style.fontSize = '22px';

  status.innerText = 'Статус: ожидаем offer';

  return status;
};

export default () => {
  const page = document.createElement('div');
  const statusElement = getStatusElement();

  connection.onIceCandidate = () => {
    statusElement.innerText = 'Статус: создан answer';
  };

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste');
        connection.onIceCandidate(
          () => (statusElement.innerText = 'Статус: создан answer')
        );
        connection.setRemoteDescription(text);
        connection.onOpen('alice', () => {
          router.navigate('game');
        });
        connection.createAnswer();
      })
      .catch(console.error);
  }).element;

  const copyOffer = new Button('Copy', () => {
    const offer = connection.getLocalDescription();
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          statusElement.innerText = 'Статус: скопировано, ждем открытия канала';
        })
        .catch(console.error);
    }
  }).element;

  page.appendChild(statusElement);
  page.appendChild(pasteButton);
  page.appendChild(copyOffer);

  return page;
};
