// 手动加载Angular
import './app.module';
angular.element(document).ready(() => {
  angular.bootstrap(document, ['app']);
});
