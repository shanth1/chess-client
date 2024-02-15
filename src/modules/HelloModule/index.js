import { Component } from '@/base';
import { Header } from '@/common';
import styles from './style.module.css';

export default () => {
  const element = new Component('div').element;
  element.classList.add(styles.hello);

  const header = new Header('Hello, world!');

  element.appendChild(header.element);

  return element;
};
