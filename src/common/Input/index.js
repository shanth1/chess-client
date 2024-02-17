import { Component } from '@/base';
import style from './style.module.css';

export default class extends Component {
  constructor() {
    super('input');
    this._element.classList.add(style.input);
  }
}
