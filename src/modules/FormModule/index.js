import { Header } from '@/common';
import styles from './style.module.css';
import getInput from './components/Input';
import { store } from '@/app/data';
import { SET_TEXT } from '@/app/data/actions';

export default () => {
  const element = document.createElement('div');
  element.classList.add(styles.form);

  element.appendChild(new Header('Input name').element);

  const inputElement = getInput();
  inputElement.value = store.getState().input.text;
  inputElement.oninput = (event) => {
    inputElement.value = event.target.value;
    store.dispatch({ type: SET_TEXT, payload: { text: event.target.value } });
  };
  element.appendChild(inputElement);

  return element;
};
