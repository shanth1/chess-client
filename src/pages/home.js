import { getMenuModule } from '../modules';

export default () => {
  const page = document.createElement('div');

  page.appendChild(getMenuModule('Menu', []));

  return page;
};
