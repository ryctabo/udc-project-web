'use strict';
var moduleUdc = angular.module('moduleUdc', ['ui.router', 'ngResource']);
moduleUdc.config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {
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
    })
    .state('mainIndex', {
      url: '/',
      parent: 'main',
      template: '<h4 style="color: #555;">Bienvenido {{sessionInfo.name}}</h4>'
    })
    .state('profile', {
      url: '/profile',
      parent: 'main',
      template: '<h3 class="row" style="margin:0 0 10px 0;padding:0;">Perfil de usuario</h3>'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'app/users/users.html',
      controller: 'usersController',
      parent: 'main'
    })
    .state('faculties', {
      url: '/faculties',
      templateUrl: '/app/faculties/faculties.html',
      controller: 'facultiesController',
      parent: 'main'
    })
    .state('faculties.new', {
      url: '/new',
      templateUrl: '/app/faculties/faculties-form.html',
      controller: 'facultiesFormController'
    })
    .state('faculties.edit', {
      url: '/{facultyId}/edit',
      templateUrl: '/app/faculties/faculties-form.html',
      controller: 'facultiesFormController'
    })
    .state('programs', {
      url: '/programs',
      templateUrl: 'app/programs/programs.html',
      controller: 'programsController',
      parent: 'main'
    })
    .state('programs.new', {
      url: '/programs/new',
      templateUrl: 'app/programs/programs-form.html',
      controller: 'programsFormController'
    })
    .state('programs.edit', {
      url: '/{programsId}/edit',
      templateUrl: 'app/programs/programs-form.html',
      controller: 'programsFormController'
    })
    .state('documents', {
      url: '/documents',
      templateUrl: 'app/documents/documents.html',
      controller: 'documentsController',
      parent: 'main'
    })
    .state('documents.new', {
      url: '/new',
      templateUrl: 'app/documents/documents-form.html',
      controller: 'documentsFormController'
    })
    .state('documents.edit', {
      url: '/{documentId}/edit',
      templateUrl: 'app/documents/documents-form.html',
      controller: 'documentsFormController'
    });

  $httpProvider.interceptors.push(function ($q) {
    return {
      request: function (config) {
        if (sessionStorage.authToken)
          config.headers.Authorization = 'Bearer ' + sessionStorage.authToken;
        return config;
      },
      response: function (response) {
        return response;
      },
      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          delete sessionStorage.authToken;
        }
        return $q.reject(rejection);
      }
    };
  });
}]);