'use strict';
moduleUdc.controller('resetController', ['$scope', '$timeout', '$state', 'apiService', function ($scope, $timeout, $state, apiService) {
  $scope.loading = false;
  $scope.currentStep = 1;
  $scope.form = {};
  $scope.confirmPassword = '';
  $scope.sentPin = false;
  $scope.pinVerifier = false;

  $scope.getButtonLabel = function () {
    switch ($scope.currentStep) {
      case 1: return 'Enviar código';
      case 2: return 'Verificar';
      case 3: return 'Cambiar contraseña';
    }
  };

  $scope.onClickNextButton = function () {
    switch ($scope.currentStep) {
      case 1:
        $scope.sendPin();
        break;
      case 2:
        $scope.verifyPin();
        break;
      case 3:
        $scope.resetPass();
        break;
    }
  };

  $scope.sendPin = function () {
    console.log('sendPin');
    if (!$scope.sentPin && !$scope.pinVerifier) {
      $scope.loading = true;
      apiService.accounts.pin($scope.form.email).then(function (data) {
        console.log(data);
        $scope.loading = false;
        $scope.sentPin = true;
        $scope.currentStep++;
      }, function (error) {
        $scope.loading = false;
        console.log(error);
      });
    } else if ($scope.sentPin) {
      $scope.currentStep++;
    }
  };

  $scope.verifyPin = function () {
    console.log('verifyPin');
    if ($scope.sentPin && !$scope.pinVerifier) {
      $scope.loading = true;
      apiService.accounts.validatePin($scope.form.pin, $scope.form.email).then(function (data) {
        console.log(data);
        $scope.loading = false;
        $scope.pinVerifier = true;
        $timeout(function () {
          $scope.currentStep++;
        }, 1000);
      }, function (error) {
        $scope.loading = false;
        console.log(error);
      });
    } else if ($scope.pinVerifier) {
      $scope.currentStep++;
    }
  };

  $scope.resetPass = function () {
    console.log('resetPass -> ' + $scope.sentPin + ':' + $scope.pinVerifier);
    if ($scope.sentPin && $scope.pinVerifier) {
      $scope.loading = true;
      apiService.accounts.reset($scope.form).then(function (data) {
        console.log(data);
        $scope.loading = false;
        $state.go('login');
      }, function (error) {
        console.log(error);
        $scope.loading = false;
      });
    } else {
      console.log('No se ha enviado o confirmado el código de seguridad.');
    }
  };

}]);