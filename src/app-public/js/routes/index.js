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
      name: 'Solution',
      url: '/solution',
      templateUrl: 'src/app-public/view/solution.html',
      controller: 'SolutionCtrl'
    })
    .state({
      name: 'Product',
      url: '/product',
      templateUrl: 'src/app-public/view/product.html',
      controller: 'ProductCtrl'
    })
    .state({
      name: 'About',
      url: '/about',
      templateUrl: 'src/app-public/view/about.html',
      controller: 'AboutCtrl'
    });

  $urlRouterProvider.otherwise(''); //错误路由重定向

}
