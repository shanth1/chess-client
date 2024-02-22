import { store } from '../app/data';
import { SET_TURN_SERVERS } from '../app/data/actions';
import router from '../app/router';
import Component from '../base/Component';
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
  backButton.style.marginTop = '20px';

  const menuButtons = [bobButton, aliceButton, turnButton, backButton];

  const turnStatus = new Component('div');
  turnStatus.element.style.display = 'flex';
  turnStatus.element.style.justifyContent = 'center';
  turnStatus.subscribe(store, () => {
    if (localStorage.getItem('chess-state')) {
      turnStatus.element.innerText = 'turn is connected';
      turnStatus.element.style.color = 'green';
    } else {
      turnStatus.element.innerText = 'turn is not connected';
      turnStatus.element.style.color = 'red';
    }
  });

  page.appendChild(getMenuModule('Choose the role', menuButtons));
  page.appendChild(turnStatus.element);

  return page;
};
