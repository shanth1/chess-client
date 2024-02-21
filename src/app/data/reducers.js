import { SET_USERNAME, GET_TURN_SERVERS } from './actions';

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
    case GET_TURN_SERVERS:
      return state;
    default:
      return state;
  }
};
