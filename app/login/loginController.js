'use strict';
moduleUdc.controller('loginController', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
  if (sessionStorage.authToken)
    $state.go('mainIndex');
  
  $scope.form = { username: '', password: '' };
  $scope.unauthorizate = false;
  $scope.loginProgress = false;
  
  $scope.login = function () {
    $scope.loginProgress = true;
    $scope.unauthorizate = false;
    apiService.accounts.login($scope.form).then(
      function (result) {
        sessionStorage.authToken = result.data.token;
        $state.go('mainIndex');
        $scope.loginProgress = false;
      },
      function (error) {
        console.error(error);
        $scope.loginProgress = false;
        if (error.status === 401) {
          $scope.unauthorizate = true;
        }
      });
  };
  
}]);