moduleUdc.controller('facultiesController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.faculties = [];
  $scope.loading = true;

  apiService.faculties.getAll().$promise.then(function (data) {
    $scope.loading = false;
    $scope.faculties = data;
  }, function (error) {
    console.log(error);
  });

  $scope.deleteFaculty = function () {
    console.log('deleting!');
  };
}]);