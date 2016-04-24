'use strict';

var moduleUdc = angular.module("moduleUdc", ['ui.router']);

moduleUdc.config(function ($stateProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'loginController'
    })
    .state('main', {
      abstract: true,
      templateUrl: 'app/main/main.html',
      controller: 'mainController'
    }).state('mainIndex', {
      url: '/',
      parent: 'main',
      template: '<div ui-view></div>'
    })
    .state('programs', {
      url: '/programs',
      parent: 'main',
      template: '<h1>Programas (listado)</h1>'
    })
    
    
    


});
