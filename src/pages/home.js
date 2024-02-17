import router from '../app/router';
import { getMenuModule } from '../modules';
import { Button } from '@/common';

export default () => {
  const page = document.createElement('div');

  const connectButton = new Button('p2p', () => {
    router.navigate('connect');
  }).element;
  const offlineButton = new Button('offline').element;
  offlineButton.disabled = true;

  const menuButtons = [connectButton, offlineButton];

  page.appendChild(getMenuModule('Menu', menuButtons));

  return page;
};
