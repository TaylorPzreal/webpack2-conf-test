// 手动加载Angular
import './app.module';
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});
