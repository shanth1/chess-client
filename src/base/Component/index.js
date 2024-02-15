export default class {
  constructor(tagName, attributes = {}) {
    this._element = document.createElement(tagName);
    for (const [key, value] of Object.entries(attributes)) {
      this._element.setAttribute(key, value);
    }
  }

  get element() {
    return this._element;
  }

  subscribe(store, callback) {
    store.subscribe(callback);
    callback();
  }
}
