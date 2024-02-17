import { Button, Input } from '@/common';

const setLocalDescription = async (peerConnection) => {
  const dataChannel = peerConnection.createDataChannel('channel-name');

  dataChannel.onopen = () => console.log('Канал открыт');
  dataChannel.onmessage = (e) => console.log('message:', e.data);

  const offer = await peerConnection.createOffer();

  peerConnection.setLocalDescription(offer);

  peerConnection.onicecandidate = (e) => {
    console.log(
      'icecandidate:',
      JSON.stringify(peerConnection.localDescription)
    );
  };
};

const setRemoteDescription = (peerConnection, answer) => {
  peerConnection.setRemoteDescription(JSON.parse(answer));
};

export default () => {
  const page = document.createElement('div');
  const peerConnection = new RTCPeerConnection();

  setLocalDescription(peerConnection);

  const input = new Input().element;
  const button = new Button('Ok', () => {
    setRemoteDescription(peerConnection, input.value);
  }).element;

  page.appendChild(input);
  page.appendChild(button);

  return page;
};
