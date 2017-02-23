// 注：这里只包含应用代码
// 在这里加载所有自己写的 SCSS
import '../scss/common.scss';

// Angular项目入口文件
import angular from 'angular';

// 导入所有的angular 的 module
const app = angular.module('app', []);

app.controller('homeCtrl', ['$scope', function($scope) {
  console.info('恭喜您，测试成功');
}]);
