moduleUdc.controller('documentsController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.documents = apiService.documents.getAll();
}]);