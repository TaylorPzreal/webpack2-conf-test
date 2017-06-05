// 注：这里只包含应用代码
// 在这里加载所有自己写的 SCSS
import '../../assets/scss/common.scss';

// Angular项目入口文件
import angular from 'angular';

require('angular-ui-router');

import AppCtrl from './app.controller';

// 导入所有的angular
const app = angular.module('app', ['ui.router', 'oc.lazyLoad']);

app.controller('AppCtrl', AppCtrl);

// ui-router路由
require('./app.route').default(app, angular);
require('../app-uc/js/routes').default(app, angular);