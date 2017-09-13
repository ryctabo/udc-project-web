moduleUdc.controller('documentsController', ['$scope', 'apiService', function ($scope, apiService) {
  let allDocuments = apiService.documents.getAll();
  $scope.documents = allDocuments;
  $scope.token = sessionStorage.authToken;
  $scope.searchValue = '';

  $scope.search = function (value) {
    value = value.toLowerCase();
    $scope.documents = allDocuments;
    $scope.documents = $scope.documents.filter(function (d) {
      return d.name.toLowerCase().indexOf(value) !== -1;
    });
  };
}]);