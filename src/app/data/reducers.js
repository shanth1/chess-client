import {
  SET_USERNAME,
  SET_TURN_SERVERS,
  FETCH_ERROR,
  DELETE_TURN_SERVERS,
  SET_ORIENTATION,
} from './actions';

export const profileReducer = (
  state = { username: 'user', avatar: '' },
  action = {}
) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, text: action.payload.username };
    default:
      return state;
  }
};

export const connectionReducer = (
  state = { stun: [], turn: [], error: '' },
  action = {}
) => {
  switch (action.type) {
    case SET_TURN_SERVERS:
      return { ...state, turn: action.payload.data };
    case DELETE_TURN_SERVERS:
      return { ...state, turn: [] };
    case FETCH_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export const gameReducer = (state = { orientation: '' }, action = {}) => {
  switch (action.type) {
    case SET_ORIENTATION:
      return { ...state, orientation: action.payload.orientation };
    default:
      return state;
  }
};
