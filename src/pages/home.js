import { getHelloModule } from '../modules';

export default () => {
  const page = document.createElement('div');

  page.appendChild(getHelloModule());

  return page;
};
