routing.$inject = [
  '$urlRouterProvider',
  '$locationProvider',
  '$stateProvider',
  '$logProvider'
];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider, $logProvider) {
  $locationProvider.html5Mode(false); // 开启H5模式URI
  $logProvider.debugEnabled(true); //log 日志

  $stateProvider
    .state({
      name: 'UserCenter',
      url: '/uc',
      templateUrl: 'src/app-uc/view/base-module.html',
      controller: 'BaseModuleCtrl'
    })
    .state({
      name: 'UserCenter.Userinfo',
      url: '/userinfo',
      views: {
        'usercenter@UserCenter': {
          templateUrl: 'src/app-uc/view/userinfo.html',
          controller: 'UserinfoCtrl'
        }
      }
    })
    .state({
      name: 'UserCenter.Collection',
      url: '/collection',
      views: {
        'usercenter@UserCenter': {
          templateUrl: 'src/app-uc/view/collection.html',
          controller: 'CollectionCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/uc/userinfo'); //错误路由重定向

}
