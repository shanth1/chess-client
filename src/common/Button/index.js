import './style.css';
import { Component } from '@/base';

export default class extends Component {
  constructor(text, onClick) {
    super('button');
    this._element.innerText = text;
    this._element.classList.add('button');
    this._element.onclick = onClick;
  }
}
