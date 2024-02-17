import { Component } from '@/base';
import { Header } from '@/common';
import style from './style.module.css';

export default (headerText, buttons = []) => {
  const element = new Component('div').element;
  element.classList.add(style.menu);

  const header = new Header(headerText);

  element.appendChild(header.element);
  buttons.forEach((button) => element.appendChild(button));

  return element;
};
