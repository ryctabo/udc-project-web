moduleUdc.controller('documentsFormController', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
  $scope.document = {};
  $scope.document.people = [];
  $scope.faculties = [];
  $scope.programs = [];
  $scope.facultySelected = true;
  $scope.newPerson = {};
  $scope.people = [];

  $scope.files = [];

  apiService.faculties.getAll().$promise.then(function (data) {
    $scope.faculties = data;
    $('#select_faculty').empty();
    $('#select_faculty').append('<option selected disabled>Seleccione una facultad</option>');
    for (var i = 0; i < data.length; i++) {
      var faculty = data[i];
      $('#select_faculty').append('<option value="' + faculty.id + '">' + faculty.name + '</option>');
    }
    $('select').material_select();
  });

  apiService.persons.getAll().$promise.then(function (data) {
    $scope.people = data;
  });

  $scope.changeFaculty = function () {
    apiService.programs.getAll({
      facultyId: $scope.document.faculty_id
    }).$promise.then(function (data) {
      $scope.programs = data;
      $scope.facultySelected = true;
      $('#select_program').empty();
      $('#select_program').append('<option selected disabled>Seleccione un programa</option>')
      for (var i = 0; i < data.length; i++) {
        var program = data[i];
        $('#select_program').append('<option value="' + program.id + '">' + program.name + '</option>')
      }
      $('select').material_select();
    });
  };

  $scope.addNewPerson = function () {
    console.log($scope.newPerson);
    apiService.persons.add($scope.newPerson).$promise.then(function (data) {
      console.log(data);
      $scope.people.push(data);
      $scope.document.people.push(data);
      $scope.newPerson = {};
    });
  };

  $scope.saveDocument = function () {
    var formData = new FormData();
    if ($scope.files[0]) {
      formData.append('file', $scope.files[0]);
      apiService.documentsFile.upload(formData).$promise.then(function (data) {
        //console.log(data);
        $scope.document.doc_id = data.id;
        $scope.document.exp = '2016-05-02T11:30:00.000-05:00';
        //console.log($scope.document);
        apiService.documents.add($scope.document).$promise.then(function (data) {
          console.log(data);
          $state.go('documents');
        });
      });
    } else {
      alert('Se necesita adjuntar un PDF.');
    }

  };

  $scope.searchPerson = function (event) {
    if (event.keyCode == 13) {
      apiService.persons.get($scope.search).$promise.then(function (data) {
        $scope.document.people.push(data);
      });
      $scope.search = '';
      event.preventDefault();
    }
  };

  $scope.removePerson = function (index) {
    $scope.document.people.splice(index, 1);
  };
}]);