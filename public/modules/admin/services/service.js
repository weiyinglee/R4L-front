'use strict';

App.factory('UploadFactory', ["$rootScope", "$http", "Upload", function($rootScope, $http, Upload){
  
  var service = {};

  service.fileUpload = function(name, description, file) {
  	console.log(name);
  	console.log(description);
  	console.log(file);
  }

  return service;
}]);