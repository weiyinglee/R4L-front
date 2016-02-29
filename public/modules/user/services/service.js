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
  	$http.post('/user/create', data).then(function(response){
  	   userData = response;
       console.log(userData);
       if(userData.data.success){
          //enter the event page
          location.replace('/#/events');
       }

    }, function(error){
      console.log(error);
      alert('Username/Password has already existed. Please try again!');
      location.reload();
  	});
    this.update();
  }

  //login
  service.userLogin = function(data){
  	$http.post('/user/login', data).then(function(response){
        userData = response;
        console.log(userData);
        if(userData.data.success){
          //enter the event page
          location.replace('/#/events');
        }

  	}, function(error){
      console.log(error);
      alert('Username/Password is invalid. Please try again!');
      location.reload();
  	});
    this.update();
  }

  return service;
}]);