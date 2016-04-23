'use strict';

moduleUdc.controller('indexController', function ($scope, $state) {
  $scope.message1 = 'Hola Universidad de Cartagena';
  $state.go('login');
});