const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const assets = ['assets'];
const copyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset),
      },
    ],
  });
});

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules,
  },
  plugins: [...plugins, ...copyPlugins],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
