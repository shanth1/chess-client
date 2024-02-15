import { Header } from '@/common';

export default () => {
  const page = document.createElement('div');
  const header = new Header('About page').element;

  page.appendChild(header);

  return page;
};
