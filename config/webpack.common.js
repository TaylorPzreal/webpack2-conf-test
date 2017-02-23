// 环境相关的配置
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 定义环境变量
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const options = {
  host: 'localhost', // server to be accessible externally
  port: '3000'
};

module.exports = {
  devtool: DEVELOPMENT ? 'cheap-eval-source-map' : 'cheap-module-source-map',

  entry: {
    'polyfills': helpers.root('js', 'polyfills.js'),
    'vendor': helpers.root('js', 'vendor.js'),
    'app': helpers.root('js', 'app.bootstrap.js')
  },

  output: {
    path: helpers.root('dist'),
    publicPath: DEVELOPMENT ? `http://${options.host}:${options.port}/` : '/dist/', // 本地测试用 `/`
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  resolve: {
    // alias: { // 减少文件递归解析，直接指定文件的dist路径
    //   'angular': 'angular/angular.min.js'
    // },
    // modules: [helpers.root('node_modules')], // 指定模块库的位置，减少搜索
    extensions: ['.js', '.scss', '.html', '.json'] // 扩展名文件
  },

  // context: __dirname,

  module: {
    // noParse: /node_modules\/(jquery|moment\.js)/, // 脱离webpack的解析
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: helpers.root('js')
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/, //手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {
              modules: false, // tree shinking
              loose: false,
              cacheDirectory: true // 添加缓存
            }]
          ]
        }
      }]
    }, {
      test: /\.html$/,
      use: 'html-loader',
      include: [
        helpers.root('view'),
        helpers.root('index.html')
      ]
    }, {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: DEVELOPMENT ?
        'url-loader?limit=50000&name=images/[name].[hash].[ext]' : 'url-loader?limit=50000&name=images/[name].[hash].[ext]&publicPath=/dist/',
      include: [helpers.root('images'), helpers.root('node_modules/admin-lte')]
    }, {
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      use: DEVELOPMENT ?
        'file-loader?name=fonts/[name].[ext]' : 'file-loader?name=fonts/[name].[ext]&publicPath=/dist/',
      include: [
        helpers.root('fonts'),
        helpers.root('node_modules/font-awesome/fonts'),
        helpers.root('node_modules/bootstrap/dist/fonts')
      ]
    }]
  },

  plugins: [
    //全局引入JQuery插件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    // JS打包压缩
    new UglifyJSPlugin({
      sourceMap: DEVELOPMENT,
      beautify: DEVELOPMENT, // 最紧凑的输出
      compress: {
        warnings: DEVELOPMENT,
        drop_debugger: DEVELOPMENT,
        screw_ie8: true
      },
      mangle: {
        // Skip mangling these
        except: ['$super', '$', 'exports', 'require'],
        screw_ie8: true,
        keep_fnames: true
      },
      comments: DEVELOPMENT
    }),

    // 待补充资料
    new ManifestPlugin({
      fileName: 'ark-manifest.json',
    }),

    new webpack.NamedModulesPlugin(), // 从浏览器的console观察更新的档案

    new webpack.optimize.CommonsChunkPlugin({ // 将相应代码隔离开来
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: 2,
      // children: true,
    }),

    new HtmlWebpackPlugin({ // 可以自动注入 script, link标签
      // inject: true,
      template: 'index.html'
    }),

    // Don't recommend
    // You can configure global / shared loader options with this plugin and all loaders will receive these options
    new webpack.LoaderOptionsPlugin({
      minimize: PRODUCTION,
      debug: DEVELOPMENT,
      options: {
        context: __dirname
      }
    }),

    // 定义环境变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    }),

    // 实现文件顶部版权声明
    new webpack.BannerPlugin('Copyright ark.proudsmart.com 2016 inc.')
  ]
};
