const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

/**
 * Path and env configs
 */
const PATHS = {
  app: path.join(__dirname, 'src'),
  dev: path.resolve(__dirname, 'public'),
  build: path.join(__dirname, 'dist'),
  test: path.join(__dirname, 'test'),
  vendors: /node_modules|bower_components/,
};

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, `${PATHS.app}/main.js`),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, PATHS.dev),
    sourceMapFilename: '[name].js.map',
  },
  devServer: {
    contentBase: PATHS.dev,
    compress: true,
    port: 9001,
    proxy: {
      '/socket.io': 'http://localhost:6040',
      '/api': 'http://localhost:6040',
    },
  },
  resolve: {
    modules: [
      // sigma: path.resolve(__dirname, 'node_modules/sigma/build/sigma.require.js'),
      'node_modules',
    ],
  },
  devtool: 'cheap-source-map',
  node: {
    global: false,
  },
  plugins: [
    new CopyPlugin([
      { from: './src/assets/img/favicon.ico', to: './public' },
      { from: './src/assets/img/leaflet', to: './public' },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      serviceName: process.env.SERVICE_NAME,
      clientId: process.env.CLIENT_ID,
    }),
    new webpack.DefinePlugin({
      global: 'window',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }, {
        test: /\.(swf)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /sigma.*/,
        loader: 'imports-loader?this=>window',
      },
    ],
  },
};
