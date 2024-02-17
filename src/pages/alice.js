import { Button } from '@/common';
import router from '../app/router';

const setLocalDescription = async (peerConnection, offer) => {
  peerConnection.onicecandidate = () => console.log('получен icecandidate');
  peerConnection.setRemoteDescription(JSON.parse(offer));

  window.dataChannel;
  peerConnection.ondatachannel = (event) => {
    window.dataChannel = event.channel;
    window.dataChannel.onopen = () => {
      console.log('Канал получен и открыт!');
      router.navigate('game');
    };
  };

  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);
};

export default () => {
  const page = document.createElement('div');
  const peerConnection = new RTCPeerConnection();

  const pasteButton = new Button('Paste', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste');
        setLocalDescription(peerConnection, text);
      })
      .catch(console.error);
  }).element;

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

  page.appendChild(pasteButton);
  page.appendChild(copyOffer);

  return page;
};
