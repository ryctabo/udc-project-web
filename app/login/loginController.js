'use strict';
moduleUdc.controller('loginController', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
  if (sessionStorage.authToken)
    $state.go('mainIndex');
  
  $scope.form = { username: '', password: '' };
  $scope.unauthorizate = false;
  
  $scope.login = function () {
    $scope.unauthorizate = false;
    apiService.accounts.login($scope.form).then(
      function (result) {
        sessionStorage.authToken = result.data.token;
        $state.go('mainIndex');
      },
      function (error) {
        console.error(error);
        if (error.status === 401) {
          $scope.unauthorizate = true;
        }
      });
  };
  
}]);