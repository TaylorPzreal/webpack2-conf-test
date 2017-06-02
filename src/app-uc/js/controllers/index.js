import angular from 'angular';

import BaseModuleCtrl from './base-module.ctrl';
import UserinfoCtrl from './userinfo.ctrl';
import CollectionCtrl from './collection.ctrl';

const app = angular.module('app-uc.controllers', []);

app
  .controller('BaseModuleCtrl', BaseModuleCtrl)
  .controller('UserinfoCtrl', UserinfoCtrl)
  .controller('CollectionCtrl', CollectionCtrl);


export default app;
