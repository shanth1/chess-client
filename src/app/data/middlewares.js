import { FETCH_ERROR } from './actions';

export const fetchMiddleware = (store) => (next) => (action) => {
  if (action.isFetch) {
    fetch(action.payload.url)
      .then((response) => response.json())
      .then((data) => {
        console.log('success response:', data);
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
          const newAction = {
            type: action.type,
            payload: { data },
          };
          store.dispatch(newAction);
        } catch (error) {
          return Promise.reject(
            new Error('Connection instantiation console.error();')
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.name === 'SyntaxError' ? 'Fetch error' : error.message;
        store.dispatch({
          type: FETCH_ERROR,
          payload: { error: errorMessage },
        });
        setTimeout(() => {
          store.dispatch({ type: FETCH_ERROR, payload: { error: '' } });
        }, 1500);
      });
  } else {
    next(action);
  }
};
