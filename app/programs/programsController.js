moduleUdc.controller('programsController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.programs = [];
  $scope.faculties = [];
  $scope.edit = true;
  $scope.programDetail = {};
  $scope.newProgram = true;
  $scope.itemSelected = -1;

  apiService.faculties.getAll().$promise.then(function (data) {
    $scope.faculties = data;
    angular.forEach($scope.faculties, function (value, key) {
      $('#select_faculty').append('<option value="' + value.id + '">' + value.name + '</option>');
    });
    $('select').material_select();
  }, function (error) {
    console.log(error);
  });
  
  $scope.loadPrograms = function () {
    $scope.loading = true;
    apiService.programs.getAll().$promise.then(function (data) {
      $scope.loading = false;
      $scope.programs = data;
    });
  };
  $scope.loadPrograms();
  
  $scope.deleteProgram = function () {
    console.log('deleting');
  };
  
  $scope.saveProgram = function () {
    $scope.programDetail.nomenclature = $scope.programDetail.nomenclature.toUpperCase();
    if ($scope.newProgram) {
      apiService.programs.add($scope.programDetail).$promise.then(function (data) {
        $scope.programs.push(data);
        $scope.edit = false;
      }, function (error) {
        console.log(error);
      });
    } else {
      $scope.updateProgram();
    }
  };
  
  $scope.changeProgram = function (index) {
    $scope.programDetail = $scope.programs[index];
    $scope.newProgram = false;
    $scope.edit = false;
    $scope.itemSelected = index;
  };
  
  $scope.updateProgram = function () {
    console.log('edit program with id ' + $scope.itemSelected);
    console.log($scope.programs[$scope.itemSelected]);
  };
}]);