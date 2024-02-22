import router from '../app/router';
import { getMenuModule } from '../modules';
import { Button } from '@/common';

export default () => {
  const page = document.createElement('div');

  const connectButton = new Button('p2p', () => {
    router.navigate('connect');
  }).element;
  const engineButton = new Button('Engine').element;
  engineButton.disabled = true;
  const offlineButton = new Button('Offline').element;
  offlineButton.disabled = true;

  const menuButtons = [connectButton, offlineButton, engineButton];

  page.appendChild(getMenuModule('Menu', menuButtons));

  return page;
};
