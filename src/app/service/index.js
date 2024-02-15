const PUBLIC_SW_PATH = './sw.js';

export const makeServiceWorkers = async () => {
  if (navigator.serviceWorker) {
    try {
      const response = await navigator.serviceWorker.register(PUBLIC_SW_PATH);
      console.log('SW register success', response);
    } catch (error) {
      console.error('SW register failed:', error);
    }
  }
};
