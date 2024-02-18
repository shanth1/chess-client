import { Button } from '@/common';
import router from '../app/router';

const setLocalDescription = async (peerConnection, statusElement) => {
  window.dataChannel = peerConnection.createDataChannel('channel-name');

  window.dataChannel.onopen = () => {
    console.log('Канал открыт');
    router.navigate('game');
  };

  const offer = await peerConnection.createOffer();

  peerConnection.setLocalDescription(offer);

  peerConnection.onicecandidate = (e) => {
    statusElement.innerText = 'Статус: создан offer';
  };
};

const setRemoteDescription = (peerConnection, answer) => {
  peerConnection.setRemoteDescription(JSON.parse(answer));
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
  const peerConnection = new RTCPeerConnection();
  const status = getStatusElement();

  setLocalDescription(peerConnection, status);

  const copyOffer = new Button('Copy', () => {
    const offer = JSON.stringify(peerConnection.localDescription);
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          console.log('copied');
          status.innerText = 'Статус: скопировано, ожидаем answer';
        })
        .catch(console.error);
    }
  }).element;

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste');
        setRemoteDescription(peerConnection, text);
      })
      .catch(console.error);
  }).element;

  page.appendChild(status);
  page.appendChild(copyOffer);
  page.appendChild(pasteButton);

  return page;
};
