moduleUdc.controller('documentsController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.documents = apiService.documents.getAll();
  $scope.token = sessionStorage.authToken;
}]);