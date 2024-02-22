const { peerConfiguration } = require('./config');

class WebRTCConnection {
  constructor(peerConfiguration) {
    this.peerConfiguration = peerConfiguration;
  }

  initPeerConnection() {
    const state = JSON.parse(localStorage.getItem('chess-state'));
    if (state?.connection) {
      this.peerConfiguration.iceServers.push(...state.connection.turn);
    }
    this.peer = new RTCPeerConnection(this.peerConfiguration);
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
      callback();
    });
  }

  setRemoteDescription(rowData) {
    this.peer.setRemoteDescription(JSON.parse(rowData));
  }

  async createOffer() {
    try {
      const offer = await this.peer.createOffer();
      this.peer.setLocalDescription(offer);
    } catch (error) {
      console.error(error);
    }
  }

  async createAnswer() {
    try {
      const answer = await this.peer.createAnswer();
      this.peer.setLocalDescription(answer);
    } catch (error) {
      console.error(error);
    }
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

export const connection = new WebRTCConnection(peerConfiguration);
