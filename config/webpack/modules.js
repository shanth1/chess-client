const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getModules = ({ mode }) => {
  const isProduction = mode === 'production';

  const babelLoader = {
    test: /\.(?:js|mjs|cjs)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { targets: 'defaults' }]],
      },
    },
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isProduction
          ? '[hash:base64:8]'
          : '[local]__[path][name]',
      },
    },
  };

  return {
    rules: [
      babelLoader,
      {
        oneOf: [
          {
            test: /\.module\.css$/i,
            use: [MiniCssExtractPlugin.loader, cssLoaderWithModules],
          },
          {
            test: /\.module\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              cssLoaderWithModules,
              'sass-loader',
            ],
          },
          {
            test: /\.css$/i,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },
    ],
  };
};

module.exports = getModules;
