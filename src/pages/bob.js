import { Button } from '@/common';
import router from '../app/router';
import { connection } from '../app/connection';
import { store } from '../app/data';
import { SET_ORIENTATION } from '../app/data/actions';

const initCallbacks = (statusElement) => {
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
  store.dispatch({ type: SET_ORIENTATION, payload: { orientation: 'white' } });

  const page = document.createElement('div');
  page.style.padding = '20px';

  const statusElement = getStatusElement();
  const logContainer = document.createElement('div');

  connection.initPeerConnection();
  initCallbacks(statusElement);
  connection.initLogger(logContainer);
  connection.createOffer();

  const copyOffer = new Button('Copy', () => {
    const offer = connection.getLocalDescription();
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          statusElement.innerText = 'Статус: скопировано, ожидаем answer';
        })
        .catch(console.error);
    }
  }).element;
  copyOffer.style.marginRight = '8px';

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
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
