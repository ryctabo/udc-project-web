moduleUdc.controller('programsFormController', ['$scope', '$stateParams', '$state', 'apiService', function ($scope, $stateParams, $state, apiService) {
  $scope.faculties = [];
  apiService.faculties.getAll().$promise.then(function (data) {
    $scope.faculties = data;
    for (var i = 0; i < data.length; i++) {
      var faculty = data[i];
      $('#select_faculty').append('<option value="' + faculty.id + '">' + faculty.name + '</option>')
    }
    $('select').material_select();
  });

  $scope.program = {};
  $scope.id = $stateParams.programsId;
  var save = $scope.id === undefined;

  if (!save) {
    $scope.program = apiService.programs.get($scope.id);
  }

  $scope.sendProgram = function () {
    console.log($scope.program);
    if (save) {
      apiService.programs.add($scope.program);
    } else {
      apiService.programs.update($scope.id, $scope.program);
    }
    $state.go('programs', null, {
      reload: true
    });
  };

}]);