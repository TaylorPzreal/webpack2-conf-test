import angular from 'angular';

import SolutionCtrl from './solution.ctrl';
import ProductCtrl from './product.ctrl';
import AboutCtrl from './about.ctrl';

const app = angular.module('public.controllers', []);

app
  .controller('SolutionCtrl', SolutionCtrl)
  .controller('ProductCtrl', ProductCtrl)
  .controller('AboutCtrl', AboutCtrl);

export default app;
