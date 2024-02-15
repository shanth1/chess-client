const path = require('path');

const getManifest = (pathToIcons) => {
  return {
    name: 'Chess',
    short_name: 'Chess',
    description: 'p2p and offline chess client',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    start_url: '.',
    display: 'standalone',
    fingerprints: false,
    publicPath: '.',
    icons: [
      {
        src: path.join(pathToIcons, 'logo-android.png'),
        sizes: [36, 48, 72, 96, 144, 192, 512],
        destination: path.join('icons', 'android'),
      },
      {
        src: path.join(pathToIcons, 'logo-ios.png'),
        sizes: [36, 48, 72, 96, 144, 192, 512, 1024],
        destination: path.join('icons', 'ios'),
        ios: true,
      },
    ],
  };
};

module.exports = getManifest;
