const path = require('path');
require('dotenv').config();
const getWebpackConfiguration = require('./config/webpack/index.js');

module.exports = (env, argv) => {
  const options = {
    mode: argv.mode,
    analyze: env.analyze,
    paths: {
      root: path.resolve(__dirname),
      entry: path.resolve(__dirname, process.env.ENTRY_PATH),
      output: path.resolve(__dirname, process.env.OUTPUT_PATH),
      public: path.resolve(__dirname, process.env.PUBLIC_PATH),
      src: path.resolve(__dirname, process.env.SRC_PATH),
    },
    port: process.env.DEV_PORT,
  };

  return getWebpackConfiguration(options);
};
