export const peerConfiguration = {
  iceServers: [
    // Google STUN серверы
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    // Twilio STUN сервер
    { urls: 'stun:global.stun.twilio.com:3478' },
    // Mozilla STUN сервер (неофициальный)
    { urls: 'stun:stun.services.mozilla.com' },
    // Nextcloud STUN сервер
    { urls: 'stun:stun.nextcloud.com:443' },
    // Nummertje STUN сервер
    { urls: 'stun:numb.viagenie.ca' },
    // VoIP STUN серверы
    { urls: 'stun:stun.voip.blackberry.com:3478' },
    { urls: 'stun:stun.voipbuster.com' },
    { urls: 'stun:stun.voxgratia.org' },
    { urls: 'stun:freestun.net:3479' },
  ],
};
