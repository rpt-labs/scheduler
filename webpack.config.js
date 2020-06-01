const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = path.join(__dirname, '/src/client/');
const env = dotenv.config().parsed;

module.exports = {
  entry: {
    main: [path.join(srcFolder, 'index.js')]
  },
  resolve: { extensions: ['.js'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            ]
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OKTA_URL': JSON.stringify(env.OKTA_URL),
      'process.env.OKTA_CLIENT_ID': JSON.stringify(env.OKTA_CLIENT_ID),
      'process.env.OKTA_BASE_URL': JSON.stringify(env.OKTA_BASE_URL)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
