// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// const helpers = require('./helpers');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader'
        }],
        publicPath: '/' // url路径处理
      }),
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }],
        publicPath: '/' // url 路径处理
      })
    }]
  },

  plugins: [
    // 提取出所有CSS为一个公共文件 主要用于生产环境
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      // disable: false,
      allChunks: true
    }),

        // GZip
    new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		}),

    // new BundleAnalyzerPlugin({
    //   // Can be `server`, `static` or `disabled`. 
    //   // In `server` mode analyzer will start HTTP server to show bundle report. 
    //   // In `static` mode single HTML file with bundle report will be generated. 
    //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
    //   analyzerMode: 'server',
    //   // Host that will be used in `server` mode to start HTTP server. 
    //   analyzerHost: '127.0.0.1',
    //   // Port that will be used in `server` mode to start HTTP server. 
    //   analyzerPort: 8888,
    //   // Path to bundle report file that will be generated in `static` mode. 
    //   // Relative to bundles output directory. 
    //   reportFilename: 'report.html',
    //   // Automatically open report in default browser 
    //   openAnalyzer: true,
    //   // If `true`, Webpack Stats JSON file will be generated in bundles output directory 
    //   generateStatsFile: false,
    //   // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
    //   // Relative to bundles output directory. 
    //   statsFilename: 'stats.json',
    //   // Options for `stats.toJson()` method. 
    //   // For example you can exclude sources of your modules from stats file with `source: false` option. 
    //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
    //   statsOptions: null,
    //   // Log level. Can be 'info', 'warn', 'error' or 'silent'. 
    //   logLevel: 'info'
    // })

  ]
});