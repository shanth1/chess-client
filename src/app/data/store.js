export class Store {
  constructor(reducers, isStorageConnected = true) {
    this._reducers = reducers;

    const stateFromLocalStorage = JSON.parse(localStorage.getItem('state'));
    if (isStorageConnected && stateFromLocalStorage) {
      this._state = stateFromLocalStorage;
    } else {
      this._state = this._reduce();
    }

    this._listeners = [];
  }

  _reduce(state, action) {
    return Object.keys(this._reducers).reduce((acc, key) => {
      acc[key] = this._reducers[key](state && state[key], action);
      return acc;
    }, {});
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    this._state = this._reduce(this._state, action);
    localStorage.setItem('state', JSON.stringify(this._state));
    this._listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }
}
