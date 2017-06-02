import angular from 'angular';

import Routing from './js/routes';
import './js/controllers';

const app = angular.module('app-uc', ['app-uc.controllers']);

app.config(Routing);

export default app;
