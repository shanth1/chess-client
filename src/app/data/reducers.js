import { DECREMENT, INCREMENT, SET_TEXT } from './actions';

export const counterReducer = (state = { value: 0 }, action = {}) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

export const inputReducer = (state = { text: 'world' }, action = {}) => {
  switch (action.type) {
    case SET_TEXT:
      return { ...state, text: action.payload.text };
    default:
      return state;
  }
};
