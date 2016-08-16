moduleUdc.controller('facultiesController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.faculties = [];
  $scope.edit = true;
  $scope.facultyDetail = {};
  $scope.newFaculty = true;
  $scope.itemSelected = -1;

  $scope.loadFaculties = function () {
    $scope.loading = true;
    apiService.faculties.getAll().$promise.then(function (data) {
      $scope.loading = false;
      $scope.faculties = data;
    }, function (error) {
      $scope.loading = false;
    });
  };
  $scope.loadFaculties();

  $scope.deleteFaculty = function () {
    console.log('deleting!');
  };

  $scope.saveFaculty = function () {
    $scope.facultyDetail.nomenclature = $scope.facultyDetail.nomenclature.toUpperCase();
    if ($scope.newFaculty)
      apiService.faculties.add($scope.facultyDetail).$promise.then(function (data) {
        $scope.faculties.push(data);
        $scope.edit = false;
      });
  };

  $scope.changeFaculty = function (index) {
    $scope.facultyDetail = $scope.faculties[index];
    $scope.newFaculty = false;
    $scope.itemSelected = index;
    $scope.edit = false;
  };
}]);