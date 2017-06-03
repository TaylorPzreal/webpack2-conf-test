export default (ngModule) => {

  ngModule.controller('AppHomeCtrl', ['$scope', ($scope) => {
    $scope.title = 'home';
    console.warn(' 首页 index 哈哈哈');
  }]);
};
