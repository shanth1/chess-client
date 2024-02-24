import { Button } from '@/common';
import router from '../app/router';
import { connection } from '../app/connection';
import { store } from '../app/data';
import { SET_ORIENTATION } from '../app/data/actions';

const getStatusElement = () => {
  const status = document.createElement('div');
  status.style.padding = '8px';
  status.style.fontSize = '22px';

  status.innerText = 'Статус: ожидаем offer';

  return status;
};

export default () => {
  store.dispatch({ type: SET_ORIENTATION, payload: { orientation: 'black' } });

  const page = document.createElement('div');
  page.style.padding = '20px';

  const statusElement = getStatusElement();
  const logContainer = document.createElement('div');

  connection.initPeerConnection();
  connection.initLogger(logContainer);
  connection.onIceCandidate = () => {
    statusElement.innerText = 'Статус: создан answer';
  };

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
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
  pasteButton.style.marginRight = '8px';

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
  page.appendChild(logContainer);

  return page;
};
