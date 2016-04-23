'use strict';

var moduleUdc = angular.module("moduleUdc", ['ui.router']);

moduleUdc.config(function ($stateProvider) {
  
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html'
  });
  
});
