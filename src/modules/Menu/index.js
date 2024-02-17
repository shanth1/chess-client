import { Component } from '@/base';
import { Header } from '@/common';

export default (headerText, buttons = []) => {
  const element = new Component('div').element;
  const header = new Header(headerText);

  element.appendChild(header.element);

  return element;
};
