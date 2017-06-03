// 手动加载Angular
import angular from 'angular';
import './app.module';
angular.element(document).ready(() => {
  angular.bootstrap(document, ['app']);
});
