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
      name: 'index',
      url: '',
      templateUrl: 'src/public/index.html',
      controller: 'AppCtrl'
    });

  $urlRouterProvider.otherwise(''); //错误路由重定向

}
