import { isPeerConfigObject } from '../connection/utils';
import { FETCH_ERROR } from './actions';

export const fetchMiddleware = (store) => (next) => (action) => {
  if (action.isFetch) {
    fetch(action.payload.url)
      .then((response) => response.json())
      .then((data) => {
        console.log('success response:', data);
        return isPeerConfigObject(data);
      })
      .then((data) => {
        const newAction = {
          type: action.type,
          payload: { data },
        };
        store.dispatch(newAction);
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
