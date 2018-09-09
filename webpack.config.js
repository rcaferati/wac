const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production' || false;
const minimizer = [];

if (production) {
  minimizer.push(new UglifyJsPlugin({
    uglifyOptions: {
      beautify: false,
      mangle: true,
      compress: true,
      comments: false,
    },
  }));
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: production ? 'web-animation-club.min.js' : 'web-animation-club.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'wac',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimizer,
  },
};
