// 注：这里只包含应用代码
// 在这里加载所有自己写的 SCSS
import '../../assets/scss/common.scss';

// Angular项目入口文件
import angular from 'angular';

import '../app-public';
import '../app-uc';
import '../app-mc';

import Routing from './app.route';
import AppCtrl from './app.controller';

// 导入所有的angular 的 业务module 通用模块，个人中心，管理中心，博客。。。
const app = angular.module('app', ['app-public', 'app-uc', 'app-mc', 'ui.router']);

// ui-router路由
app.config(Routing);

// 根Controller
app.controller('AppCtrl', AppCtrl);
