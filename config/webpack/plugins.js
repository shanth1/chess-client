const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');
const getManifest = require('../manifest-pwa');

const getPlugins = ({ mode, analyze, paths }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.public, 'serviceWorkers.js'),
          to: 'sw.js',
        },
      ],
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(paths.public, 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ];

  isDevelopment && plugins.push(new webpack.ProgressPlugin());

  if (isProduction) {
    plugins.push(
      new FaviconsWebpackPlugin({
        logo: path.resolve(paths.root, 'icons', 'favicon.svg'),
        mode: 'light',
      })
    );
    plugins.push(
      new WebpackPwaManifest(getManifest(path.resolve(paths.root, 'icons')))
    );

    analyze && plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};

module.exports = getPlugins;
