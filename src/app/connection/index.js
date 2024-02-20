const { peerConfiguration } = require('./config');

class WebRTCConnection {
  constructor() {
    this.peer = new RTCPeerConnection(peerConfiguration);

    this.peer.onconnectionstatechange = (event) => {
      console.log('state changed:', this.peer.iceConnectionState, event);
    };
    this.peer.onicecandidateerror = (event) => {
      console.log('ice error', event);
    };

    this.dataChannel = null;
  }

  getLocalDescription() {
    return JSON.stringify(this.peer.localDescription);
  }

  onIceCandidate(callback) {
    this.peer.onicecandidate = (event) => {
      console.log('Новый ICE кандидат: ', event.candidate);
      callback();
    };
  }

  setRemoteDescription(rowData) {
    this.peer.setRemoteDescription(JSON.parse(rowData));
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    this.peer.setLocalDescription(offer);
  }

  async createAnswer() {
    const answer = await this.peer.createAnswer();
    this.peer.setLocalDescription(answer);
  }

  onOpen(role, callback) {
    switch (role) {
      case 'alice':
        this.peer.ondatachannel = (event) => {
          console.log('on data channel', event);
          this.dataChannel = event.channel;
          this.dataChannel.onopen = callback;
        };
        break;
      case 'bob':
        this.dataChannel = this.peer.createDataChannel('channel-name');
        this.dataChannel.onopen = callback;
        break;
      default:
        console.error('unknown role');
        break;
    }
  }
}

export const connection = new WebRTCConnection();
