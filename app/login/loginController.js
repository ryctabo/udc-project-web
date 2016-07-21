'use strict';
moduleUdc.controller('loginController', function ($scope, apiService) {
  $scope.form = { username: '', password: '' };

  $scope.login = function () {
    console.log($scope.form);
    apiService.accounts.login($scope.form).then(
      function (result) {
        console.log(result);
      },
      function (error) {
        console.log('ERROR:');
        console.log(error);
      });
  };
});