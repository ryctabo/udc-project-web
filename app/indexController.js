'use strict';
moduleUdc.controller('indexController', ['$state', function ($state) {
  if (sessionStorage.authToken)
    $state.go('mainIndex');
  else
    $state.go('login');
}]);