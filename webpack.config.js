const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production' || false;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: production ? 'web-animation-club.min.js' : 'web-animation-club.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'wac',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: production
    ? [new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })]
    : []
};
