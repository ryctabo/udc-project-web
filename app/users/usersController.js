moduleUdc.controller('usersController', ['$scope', 'apiService', function ($scope, apiService) {
  
  $scope.userTypeSelected = 'Todos los usuarios';
  $scope.users = [];
  $scope.emailExists = false;
  $scope.validEmail = false;

  $scope.newUser = {};

  $scope.loadUsers = function () {
    $scope.loading = true;
    var roleType = $scope.userTypeSelected === 'Todos los usuarios' ? null : $scope.userTypeSelected.toUpperCase();
    apiService.users.getAll(roleType).$promise.then(function (data) {
      $scope.users = data;
      $scope.loading = false;
    });
  };

  $scope.loadUsers();

  $scope.saveUser = function () {
    if ($scope.validEmail) {
      apiService.users.add($scope.newUser).$promise.then(function (data) {
        console.log(data);
        $scope.users.push(data);
      }, function (error) {
        console.log(error);
      });
      $('#addNewUserModal').closeModal();
      $scope.newUser = {};
    } else {
      Materialize.toast('El correo electrónico es invalido.', 2000);
    }
  };

  $scope.validateEmail = function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test($scope.newUser.email)) {
      apiService.users.getByEmail($scope.newUser.email).then(function (data) {
        $scope.emailExists = true;
        $scope.validEmail = false;
      }, function (error) {
        if (error.status === 404) {
          $scope.emailExists = false;
          $scope.validEmail = true;
        }
      });
    }
  };

}]);