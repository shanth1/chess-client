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

  const backButton = new Button('Go back', () => {
    router.navigate('');
  }).element;

  const menuButtons = [bobButton, aliceButton, backButton];

  page.appendChild(getMenuModule('Choose the role', menuButtons));

  return page;
};
