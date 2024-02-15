const getPlugins = require('./plugins');
const getModules = require('./modules');
const getDevServer = require('./devServer');
const getResolvers = require('./resolvers');

const getWebpackConfiguration = (options) => {
  const isDevelopment = options.mode === 'development';

  return {
    entry: {
      app: options.paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: options.paths.output,
      clean: true,
    },
    plugins: getPlugins(options),
    resolve: getResolvers(options),
    module: getModules(options),
    devServer: getDevServer(options),
    devtool: isDevelopment ? 'eval' : 'source-map',
  };
};

module.exports = getWebpackConfiguration;
