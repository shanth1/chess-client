import { store } from '../app/data';
import { DELETE_TURN_SERVERS, SET_TURN_SERVERS } from '../app/data/actions';
import router from '../app/router';
import Component from '../base/Component';
import { getMenuModule } from '../modules';
import { Button } from '@/common';

const getTurnStatusElement = () => {
  const turnStatus = new Component('div');
  turnStatus.element.style.display = 'flex';
  turnStatus.element.style.justifyContent = 'center';
  turnStatus.subscribe(store, () => {
    if (store.getState()?.connection?.turn.length > 0) {
      turnStatus.element.innerText = 'turn is connected';
      turnStatus.element.style.color = 'green';
    } else if (store.getState()?.connection?.error) {
      turnStatus.element.innerText = store.getState().connection.error;
      turnStatus.element.style.color = 'red';
    } else {
      turnStatus.element.innerText = 'turn is not connected';
      turnStatus.element.style.color = 'orange';
    }
  });

  return turnStatus.element;
};

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

  const deleteTurnButton = new Button('Delete TURN', () => {
    store.dispatch({ type: DELETE_TURN_SERVERS });
  }).element;

  const backButton = new Button('←', () => {
    router.navigate('');
  }).element;
  backButton.style.marginTop = '20px';

  const menuButtons = [
    bobButton,
    aliceButton,
    turnButton,
    deleteTurnButton,
    backButton,
  ];

  page.appendChild(getMenuModule('Choose the role', menuButtons));
  page.appendChild(getTurnStatusElement());

  return page;
};
