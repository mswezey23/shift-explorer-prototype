const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
  mode: 'development',
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
      'node_modules',
    ],
  },
  devtool: 'inline-source-map',
  node: {
    global: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './src/assets/img', to: 'img' },
      // { from: './src/assets/img/leaflet', to: './public' },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      serviceName: process.env.SERVICE_NAME,
      clientId: process.env.CLIENT_ID,
    }),
    new webpack.DefinePlugin({
      global: 'window',
    }),
    // new TerserPlugin({
    //   parallel: true,
    //   terserOptions: {
    //     ecma: 6,
    //   },
    // }),
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
        test: /\.scss$/,
        loader: 'style!css!scss',
        include: PATHS.app,
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
      //   {
      //     test: /\.svg$/,
      //     loader: 'svg-inline-loader',
      //   },
      //   {
      //     test: /\.(png|jpe?g|gif)$/i,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //       },
      //     ],
      //   },
      {
        test: /\.(swf)$/,
        loader: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            query: {
              name: 'img/[name].[ext]',
            },
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
            },
          },
        }],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /sigma.*/,
        loader: 'imports-loader?this=>window',
      },
    ],
  },
};
