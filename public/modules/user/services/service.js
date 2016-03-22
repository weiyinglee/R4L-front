'use strict';

App.factory('UserFactory', ['$rootScope', '$http', '$resource', "$location",
  function($rootScope, $http, $resource, $location){
  
    var userData = {}

    var service = {}

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
      return userData;
    }

    service.update = function() {
      $rootScope.$emit('user_update');
    }

    //create
    service.userCreate = function(data){
    	$http.post('http://52.8.54.187:3000/user/create', data).then(function(response){
    	   userData = response;
         if(userData.data.success){
            //enter the event page
            $location.path('/events');
         }else{
            alert('Username has already existed. Please try again!');
            location.reload();
         }
      }, function(error){
        console.log(error);
    	});
      this.update();
    }

    //login
    service.userLogin = function(data){
    	$http.post('http://52.8.54.187:3000/user/login', data).then(function(response){
          userData = response;
          if(userData.data.success){
            //enter the event page
            $location.path('/events');
          }else{
            alert("Username/Password is invalid. Please try again!");
            location.reload();
          }
    	}, function(error){
        console.log(error);
    	});
      this.update();
    }

    return service;
}]);