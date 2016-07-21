'use strict';
moduleUdc.factory('apiService', ['$resource', '$http', 'appConfig', function ($resource, $http, appConfig) {
  var apiService = {};

  //ACCOUNTS SERVICE
  apiService.accounts = {
    login: function(loginObject) {
      return $http.post(appConfig.apiUrl + 'accounts/login', loginObject);
    },
    reset: function(resetObject) {
      return $http.post(appConfig.apiUrl + 'accounts/reset', resetObject);
    },
    pin: function(email) {
      return $http.post(appConfig.apiUrl + 'accounts/pin?q=' + email, null);
    },
    validatePin: function(pinCode, email) {
      return $http.get(appConfig.apiUrl + 'accounts/pin/' + pinCode + '?q=' + email);
    }
  };
  
  //USERS SERVICE
  var users = $resource(appConfig.apiUrl + 'users/:id', {id: '@id'}, {
    'update': { method: 'PUT' }
  });
  apiService.users = {
    getAll: function () {
      return users.query();
    },
    get: function(userId) {
      return users.get({id: userId});
    },
    add: function(user) {
      return $http.post(appConfig.apiUrl + 'users?gp=true', user);
    },
    update: function(userId, user) {
      return users.update({id: userId}, user);
    },
    delete: function(userId) {
      return users.delete({id: userId});
    }
  };

  //FACULTIES SERVICE
  var faculties = $resource(appConfig.apiUrl + 'faculties/:id', {id: '@id'}, {
    'update': { method: 'PUT' }
  });
  apiService.faculties = {
    getAll: function () {
      return faculties.query();
    },
    get: function (facultyId) {
      return faculties.get({id: facultyId});
    },
    add: function (faculty) {
      return faculties.save(faculty);
    },
    update: function (facultyId, faculty) {
      return faculties.update({id: facultyId}, faculty);
    },
    delete: function (facultyId) {
      return faculties.delete({id: facultyId});
    }
  };

  //PROGRAM SERVICE
  var programs = $resource(appConfig.apiUrl + 'programs/:id', {id: '@id'}, {
    'update': { method: 'PUT' }
  });
  apiService.programs = {
    getAll: function (params) {
      return programs.query(params);
    },
    get: function (programId) {
      return programs.get({id: programId});
    },
    add: function (program) {
      return programs.save(program);
    },
    update: function (programId, program) {
      return programs.update({id: programId}, program);
    },
    delete: function (programId) {
      return programs.delete({id: programId});
    }
  };
  
  //PERSON SERVICE
  var persons = $resource(appConfig.apiUrl + 'persons/:id', {id: '@id'}, {
    'update': { method: 'PUT' }
  });
  apiService.persons = {
    getAll: function (params) {
      return persons.query(params);
    },
    get: function (personId) {
      return persons.get({id: personId});
    },
    add: function (person) {
      return persons.save(person);
    },
    update: function (personId, person) {
      return persons.update({id: personId}, person);
    }
  }
  
  //DOCUMENT FILE SERVICE
  var documentsFile = $resource(appConfig.apiUrl + 'files/documents/:id', {id: '@id'}, {
    'save': {
      method: 'POST',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    }
  });
  apiService.documentsFile = {
    upload: function (dataForm) {
      return documentsFile.save(dataForm);
    }
  };
  
  //DOCUMENT SERVICE
  var documents = $resource(appConfig.apiUrl + 'documents/:id', {id: '@id'}, {
    'update': { method: 'PUT' }
  });
  apiService.documents = {
    getAll: function (params) {
      return documents.query(params);
    },
    get: function (documentId) {
      return documents.get({id: documentId});
    },
    add: function (document) {
      return documents.save(document);
    },
    update: function (documentId, document) {
      return documents.update({id: documentId}, document);
    },
    delete: function (documentId) {
      return documents.delete({id: documentId});
    }
  };
  
  return apiService;
}]);