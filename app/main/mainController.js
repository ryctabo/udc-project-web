moduleUdc.controller('mainController', ['$scope', '$state', function ($scope, $state) {
  if (!sessionStorage.authToken)
    $state.go('login');

  $scope.sessionInfo = {};
  if (sessionStorage.authToken) {
    var encodedUserInfo = sessionStorage.authToken.split('.')[1];
    $scope.sessionInfo = JSON.parse(atob(encodedUserInfo));
  }

  $scope.logout = function () {
    delete sessionStorage.authToken;
    $state.go('login');
  };
}]);