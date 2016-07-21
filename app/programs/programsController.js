moduleUdc.controller('programsController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.programs = [];
  $scope.loading = true;
  
  apiService.programs.getAll().$promise.then(function (data) {
    $scope.loading = false;
    $scope.programs = data;
  });
  
  $scope.deleteProgram = function () {
    console.log('deleting');
  };
}]);