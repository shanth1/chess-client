import Header from '@/common/Header';
import Button from '@/common/Button';
import styles from './style.module.css';
import { store } from '@/app/data';
import { DECREMENT, INCREMENT } from '@/app/data/actions';

const incrementButton = new Button('Inc', 'green', () => {
  store.dispatch({ type: INCREMENT });
}).element;

const decrementButton = new Button('Dec', 'red', () => {
  store.dispatch({ type: DECREMENT });
}).element;

export default () => {
  const element = document.createElement('div');
  element.classList.add(styles.hello);

  element.appendChild(new Header('Clicker!').element);
  element.appendChild(incrementButton);
  element.appendChild(decrementButton);

  return element;
};
