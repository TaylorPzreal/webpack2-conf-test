import angular from 'angular';

import Routing from './js/routes';

import './js/controllers';

const app = angular.module('app-public', ['public.controllers', 'ui.router']);

app.config(Routing);

export default app;
