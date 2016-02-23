'use strict';

App.factory('UserFactory', ['$rootScope', '$http', function($rootScope, $http){
  
  var userData = {
    user_id: 0,
    success: false,
    message: ""
  }

  var service = {};

  service.getUserId = function(){
    return userData.user_id;
  }

  service.getSuccess = function(){
    return userData.success;
  }

  service.getMessage = function(){
    return userData.message;
  }

  service.getUserData = function(){
    return {
      user_id: userData.user_id,
      success: userData.success,
      message: userData.message
    }
  }

  service.update = function() {
    $rootScope.$emit('user_update');
  }

  //create
  service.userCreate = function(data){
  	$http.post('/users/create', data).then(function(response){
  	   userData = response;
    }, function(error){
  		console.log('Create failed' + error);
  	});
    this.update();
  }

  //login
  service.userLogin = function(data){
  	$http.post('/users/login', data).then(function(response){
        userData = response;
  	}, function(error){
  		console.log('login failed' + error);
  	});
    this.update();
  }

  return service;
}]);