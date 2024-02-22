const LOCAL_STORAGE_KEY = 'chess-state';

export class Store {
  constructor(reducers, middlewares = [], isLocalStorageConnected = true) {
    this._reducers = reducers;
    this._middlewares = middlewares;
    this._isLocalStorageConnected = isLocalStorageConnected;

    const stateFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (this._isLocalStorageConnected && stateFromLocalStorage) {
      this._state = stateFromLocalStorage;
    } else {
      this._state = this._reduce();
    }

    this._listeners = [];
    this._initMiddlewares();
  }

  _initMiddlewares() {
    const middlewareAPI = {
      getState: this.getState.bind(this),
      dispatch: (action, ...args) => this.dispatch(action, ...args),
    };
    const chain = this._middlewares.map((middleware) =>
      middleware(middlewareAPI)
    );
    this.dispatch = chain.reduce(
      (next, middleware) => middleware(next),
      this.dispatch.bind(this)
    );
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
    if (this._isLocalStorageConnected) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._state));
    }
    this._listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }
}
