// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const dashboardPlugin = require('webpack-dashboard/plugin');

const options = {
  host: 'localhost', // server to be accessible externally
  port: '3000'
};

module.exports = webpackMerge(commonConfig, {
  // Cache the generated webpack modules and chunks to improve build speed
  cache: true,

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            },
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      include: [helpers.root('src'), helpers.root('assets/scss')]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            },
            sourceMap: true
          }
        }
      ]
    }]
  },

  plugins: [
    new dashboardPlugin(), // 启动dashboard
  ],

  devServer: {
    compress: true, // gzip for everything served.
    historyApiFallback: true, //HTML5 history API ,所有的跳转将指向index.html
    stats: 'minimal', // errors-only , minimal, 'normal', 'none'
    // hot: true, //热加载
    // clientLogLevel: 'info', // Possible values are none, error, warning or info (default).
    // host: options.host,
    // lazy: true, // the dev-server will only compile the bundle when it gets requested
    port: options.port,
    // publicPath: `http://${options.host}:${options.port}/`,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});
