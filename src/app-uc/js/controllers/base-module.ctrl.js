export default (ngModule) => {

  ngModule.controller('BaseModuleCtrl', ['$scope', ($scope) => {
    console.warn('基本个人中心根模型信息');
  }]);
};
