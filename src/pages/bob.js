import { Button } from '@/common';
import router from '../app/router';

const setLocalDescription = async (peerConnection) => {
  window.dataChannel = peerConnection.createDataChannel('channel-name');

  window.dataChannel.onopen = () => {
    console.log('Канал открыт');
    router.navigate('game');
  };

  const offer = await peerConnection.createOffer();

  peerConnection.setLocalDescription(offer);

  peerConnection.onicecandidate = (e) => {
    console.log('получен icecandidate');
  };
};

const setRemoteDescription = (peerConnection, answer) => {
  peerConnection.setRemoteDescription(JSON.parse(answer));
};

export default () => {
  const page = document.createElement('div');
  const peerConnection = new RTCPeerConnection();

  setLocalDescription(peerConnection);

  const copyOffer = new Button('Copy', () => {
    const offer = JSON.stringify(peerConnection.localDescription);
    if (offer) {
      navigator.clipboard
        .writeText(offer)
        .then(() => {
          console.log('copied');
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

  page.appendChild(copyOffer);
  page.appendChild(pasteButton);

  return page;
};
