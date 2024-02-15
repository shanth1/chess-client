import './app/styles/normalize.css';
import { makeServiceWorkers } from './app/service';
import { getHomePage } from './pages';
import router from './app/router';

window.addEventListener('load', () => {
  makeServiceWorkers();
});

const rootElement = document.getElementById('root');
const pageContainer = document.createElement('div');

router.initPageContainer(pageContainer);
router.initRoutes({
  '/': getHomePage(),
});

rootElement.appendChild(pageContainer);
