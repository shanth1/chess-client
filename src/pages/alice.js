import { Button } from '@/common';
import router from '../app/router';
import { pcConfig } from '../app/config';

const setLocalDescription = async (peerConnection, offer, statusElement) => {
  peerConnection.onicecandidate = () => {
    statusElement.innerText = 'Статус: создан answer';
  };
  peerConnection.setRemoteDescription(JSON.parse(offer));

  window.dataChannel;
  peerConnection.ondatachannel = (event) => {
    window.dataChannel = event.channel;
    window.dataChannel.onopen = () => {
      router.navigate('game');
    };
  };

  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);
};

const getStatusElement = () => {
  const status = document.createElement('div');
  status.style.padding = '8px';
  status.style.fontSize = '22px';

  status.innerText = 'Статус: ожидаем offer';

  return status;
};

export default () => {
  const page = document.createElement('div');
  const peerConnection = new RTCPeerConnection(pcConfig);
  const status = getStatusElement();

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste');
        setLocalDescription(peerConnection, text, status);
      })
      .catch(console.error);
  }).element;

  const copyOffer = new Button('Copy', () => {
    const offer = JSON.stringify(peerConnection.localDescription);
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          status.innerText = 'Статус: скопировано, ждем открытия канала';
        })
        .catch(console.error);
    }
  }).element;

  page.appendChild(status);
  page.appendChild(pasteButton);
  page.appendChild(copyOffer);

  return page;
};
