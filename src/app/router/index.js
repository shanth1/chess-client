class Router {
  constructor(pageId = 'page', isHashRouter = true) {
    !isHashRouter && console.log('url routing is not available now');
    this.pageId = pageId;

    window.addEventListener('hashchange', (event) => {
      this._resolve();
    });

    window.addEventListener('DOMContentLoaded', () => {
      this._resolve();
    });
  }

  initRoutes(routes) {
    this._routes = routes;
  }

  initPageContainer(element) {
    this._pageContainer = element;
    this._pageContainer.id = 'page-container';
  }

  _activeClassResolver(eventType, callback) {
    window.addEventListener(eventType, () => {
      if (location.hash === '') {
        callback('#');
      } else {
        callback(location.hash);
      }
    });
  }

  updateActiveClass(callback) {
    this._activeClassResolver('hashchange', callback);
    this._activeClassResolver('DOMContentLoaded', callback);
  }

  navigate(url) {
    location.hash = url;
  }

  isActive(url) {
    if (!location.hash && url === '#') {
      return true;
    }
    if (location.hash === url) {
      return true;
    }
    return false;
  }

  _updatePage(element) {
    this._pageContainer.innerHTML = '';
    this._pageContainer.appendChild(element);
  }

  _resolve() {
    if (location.hash === '') {
      const homePage = this._routes['/'];
      if (homePage) {
        this._updatePage(homePage);
      }
      return;
    }

    const newPage = this._routes[location.hash.replace('#', '/')];
    if (newPage) {
      this._updatePage(newPage);
    } else {
      this._pageContainer.innerHTML = '404 | Not Found';
    }
  }
}

export default new Router();
