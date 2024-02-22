import { FETCH_ERROR } from './actions';

export const fetchMiddleware = (store) => (next) => (action) => {
  if (action.isFetch) {
    fetch(action.payload.url)
      .then((response) => response.json())
      .then((data) => {
        console.log('success response:', data);
        const newAction = { type: action.type, payload: { data } };
        store.dispatch(newAction);
      })
      .catch((error) => {
        console.log('error on fetch:', error);
        store.dispatch({
          type: FETCH_ERROR,
          payload: { error: 'Fetch error' },
        });
        setTimeout(() => {
          store.dispatch({ type: FETCH_ERROR, payload: { error: '' } });
        }, 1500);
      });
  } else {
    next(action);
  }
};
