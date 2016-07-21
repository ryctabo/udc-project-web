moduleUdc.controller('facultiesFormController', ['$scope', '$stateParams', '$state', 'apiService', function ($scope, $stateParams, $state, apiService) {
  $scope.faculty = {};
  $scope.id = $stateParams.facultyId;
  var save = $scope.id === undefined;
  
  if (!save) {
    $scope.faculty = apiService.faculties.get($stateParams.facultyId);
  }
  
  $scope.sendFaculty = function () {
    if (save) {
      apiService.faculties.add($scope.faculty);
    } else {
      apiService.faculties.update($scope.id, $scope.faculty);
    }
    $state.go('faculties', null, {
      reload: true
    });
  };
  
}]);