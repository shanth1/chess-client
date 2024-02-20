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

  initLogger(logContainer) {
    const addMessage = (message, status) => {
      const log = document.createElement('div');
      log.style.paddingBottom = '5px';
      switch (status) {
        case 'ok':
          if (message) {
            log.style.color = 'green';
          }
          break;
        case 'error':
          log.style.color = 'red';
          break;
        case 'state':
          log.style.color = 'orange';
          break;
        default:
          break;
      }
      log.innerText = message;
      logContainer.prepend(log);
    };
    this.peer.onconnectionstatechange = (event) => {
      const message = `[state changed]: ${this.peer.iceConnectionState}`;
      addMessage(message, 'state');
    };
    this.peer.onicecandidateerror = (event) => {
      addMessage(event.type, 'error');
    };
    this.peer.onicecandidate = (event) => {
      const message = event.candidate?.candidate;
      addMessage(message, 'ok');
    };
  }

  getLocalDescription() {
    return JSON.stringify(this.peer.localDescription);
  }

  onIceCandidate(callback) {
    this.peer.addEventListener('icecandidate', () => {
      console.log('Новый ICE кандидат: ', event.candidate);
      callback();
    });
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
