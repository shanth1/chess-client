import { SET_USERNAME, SET_TURN_SERVERS } from './actions';

export const profileReducer = (
  state = { username: 'user', avatar: '' },
  action = {}
) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, text: action.payload.username };
    default:
      break;
  }
};

export const connectionReducer = (
  state = { stun: {}, turn: {} },
  action = {}
) => {
  switch (action.type) {
    case SET_TURN_SERVERS:
      console.log('REDUCER:', action.payload.data);
      return { ...state, turn: action.payload.data };
    default:
      return state;
  }
};
