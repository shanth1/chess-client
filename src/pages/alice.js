import { Button, Input } from '@/common';

const setLocalDescription = async (offer) => {
  const peerConnection = new RTCPeerConnection();
  peerConnection.onicecandidate = (e) =>
    console.log(
      'icecandidate:',
      JSON.stringify(peerConnection.localDescription)
    );

  console.log('before remote:', JSON.parse(offer));
  peerConnection.setRemoteDescription(JSON.parse(offer));

  let dataChannel;
  peerConnection.ondatachannel = (event) => {
    console.log('ON DATA CHANNEL');
    dataChannel = event.channel;
    dataChannel.onopen = () => console.log('Канал получен и открыт!');
    dataChannel.onmessage = (e) => console.log('message:', e.data);
  };

  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);
};

export default () => {
  const page = document.createElement('div');
  const input = new Input().element;
  const button = new Button('Ok', () => {
    setLocalDescription(input.value);
  }).element;

  page.appendChild(input);
  page.appendChild(button);

  return page;
};
