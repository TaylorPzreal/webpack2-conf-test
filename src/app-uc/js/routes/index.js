export default (ngModuleRef, angularRef) => {
  ngModuleRef.config([
      '$urlRouterProvider',
      '$locationProvider',
      '$stateProvider',
      '$logProvider',
      '$qProvider',
      '$compileProvider',
      '$ocLazyLoadProvider',
      (
        $urlRouterProvider,
        $locationProvider,
        $stateProvider,
        $logProvider,
        $qProvider,
        $compileProvider,
        $ocLazyLoadProvider
      ) => {

        $locationProvider.html5Mode(false); // 开启H5模式URI
        $logProvider.debugEnabled(true); //log 日志
        $locationProvider.hashPrefix('!');

        $qProvider.errorOnUnhandledRejections(false);
        $compileProvider.debugInfoEnabled(false);

        $ocLazyLoadProvider.config({
          debug: true,
          events: true
        });

        $stateProvider
          .state({
            name: 'UserCenter',
            url: '/uc',
            controller: 'BaseModuleCtrl',
            templateProvider: ['$q', ($q) => {

              const deferred = $q.defer();

              require.ensure(['../../view/base-module.html'], () => {
                const template = require('../../view/base-module.html');
                deferred.resolve(template);
              });

              return deferred.promise;
            }],
            resolve: {
              appUC: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {

                const deferred = $q.defer();

                require.ensure([], () => {
                  const module = require('../../index').default(angularRef);
                  $ocLazyLoad.load({
                    name: 'app-uc'
                  });
                  deferred.resolve(module);
                });

                return deferred.promise;
              }]
            }
          })
          .state({
            name: 'UserCenter.Userinfo',
            url: '/info',
            views: {
              'usercenter@UserCenter': {

                controller: 'UCUserinfoCtrl',
                templateProvider: ['$q', ($q) => {

                  const deferred = $q.defer();

                  require.ensure(['../../view/userinfo.html'], () => {
                    const template = require('../../view/userinfo.html');
                    deferred.resolve(template);
                  });

                  return deferred.promise;
                }],
                resolve: {
                  appUC: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {

                    const deferred = $q.defer();

                    require.ensure([], () => {
                      const module = require('../../index').default(angularRef);
                      $ocLazyLoad.load({
                        name: 'app-uc'
                      });
                      deferred.resolve(module);
                    });

                    return deferred.promise;
                  }]
                }
              }
            }
          })
           .state({
            name: 'UserCenter.Collection',
            url: '/collection',
            views: {
              'usercenter@UserCenter': {

                controller: 'UCCollectionCtrl',
                templateProvider: ['$q', ($q) => {

                  const deferred = $q.defer();

                  require.ensure(['../../view/collection.html'], () => {
                    const template = require('../../view/collection.html');
                    deferred.resolve(template);
                  });

                  return deferred.promise;
                }],
                resolve: {
                  appUC: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {

                    const deferred = $q.defer();

                    require.ensure([], () => {
                      const module = require('../../index').default(angularRef);
                      $ocLazyLoad.load({
                        name: 'app-uc'
                      });
                      deferred.resolve(module);
                    });

                    return deferred.promise;
                  }]
                }
              }
            }
          });

        $urlRouterProvider.when('', '');
        $urlRouterProvider.otherwise(''); //错误路由重定向

      }
    ])
    .run(['$templateCache', ($templateCache) => {
      $templateCache.removeAll();
    }]);
};
