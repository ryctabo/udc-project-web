'use strict';
moduleUdc.controller('loginController', function ($scope, apiService) {
    $scope.form = { username: '', password: '' };

    $scope.login = function () {
        apiService.users.login($scope.form).then(
            function (result) {
                alert(JSON.stringify(result));
            },
            function (error) {
                alert(JSON.stringify(error));
            });

    }
})