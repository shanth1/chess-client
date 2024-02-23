export const isPeerConfigObject = async (data) => {
  if (!Array.isArray(data)) {
    return Promise.reject(new Error('Incorrect response'));
  }
  for (const server of data) {
    if (typeof server.urls !== 'string' && !Array.isArray(server.urls)) {
      return Promise.reject(new Error('Incorrect urls in iceServers'));
    }
  }
  try {
    new RTCPeerConnection(data);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(
      new Error('Connection instantiation console.error();')
    );
  }
};
