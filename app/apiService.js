'use strict';

moduleUdc.factory('apiService', function ($http, appConfig) {
  var apiService = {};

  apiService.users = {
    login: function (form) {
      return $http.post(appConfig.apiUrl + 'users/login', form);
    }
  }

  return apiService;
});