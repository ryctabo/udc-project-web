moduleUdc.controller('mainController', ['$scope', '$state', function ($scope, $state) {
  if(!sessionStorage.authToken)
    $state.go('login');
  
  $scope.logout = function () {
    delete sessionStorage.authToken;
    $state.go('login');
  };
}]);