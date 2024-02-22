import { store } from '../app/data';
import { SET_TURN_SERVERS } from '../app/data/actions';
import router from '../app/router';
import { getMenuModule } from '../modules';
import { Button } from '@/common';

export default () => {
  const page = document.createElement('div');

  const bobButton = new Button('Bob', () => {
    router.navigate('bob');
  }).element;

  const aliceButton = new Button('Alice', () => {
    router.navigate('alice');
  }).element;

  const turnButton = new Button('Past TURN', () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('paste turn');
        store.dispatch({
          isFetch: true,
          type: SET_TURN_SERVERS,
          payload: { url: text },
        });
      })
      .catch(console.error);
  }).element;

  const backButton = new Button('←', () => {
    router.navigate('');
  }).element;

  const menuButtons = [bobButton, aliceButton, turnButton, backButton];

  page.appendChild(getMenuModule('Choose the role', menuButtons));

  return page;
};
