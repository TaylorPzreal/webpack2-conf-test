
import angular from 'angular';

import appCtrl from './app.ctrl';

const app = angular.module('public.controllers', []);

app.controller('appCtrl', appCtrl);

export default app;
