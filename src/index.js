import './app/styles/normalize.css';
import { makeServiceWorkers } from './app/service';
import {
  getAlicePage,
  getBobPage,
  getConnectPage,
  getGamePage,
  getHomePage,
} from './pages';
import router from './app/router';

window.addEventListener('load', () => {
  makeServiceWorkers();
});

const rootElement = document.getElementById('root');

router.initPageContainer(rootElement);
router.initRoutes({
  '/': getHomePage(),
  '/alice': getAlicePage(),
  '/bob': getBobPage(),
  '/connect': getConnectPage(),
  '/game': getGamePage(),
});
