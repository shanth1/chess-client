import { getCounterModule, getFormModule, getHelloModule } from '../modules';

export default () => {
  const page = document.createElement('div');

  page.appendChild(getHelloModule());
  page.appendChild(getFormModule());
  page.appendChild(getCounterModule());

  return page;
};
