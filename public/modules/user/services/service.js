'use strict';

App.factory('UserFactory', ['$rootScope', '$http', '$resource', "$location", "$cookieStore",
  function($rootScope, $http, $resource, $location, $cookieStore){

    var service = {}

    service.getUserData = function(){
      return $cookieStore.get('userData');
    }

    service.update = function() {
      $rootScope.$emit('user_update');
    }

    //create
    service.userCreate = function(data){
    	$http.post('http://52.8.54.187:3000/user/create', data).then(function(response){
         $cookieStore.put('userData', response);
         var userData = $cookieStore.get('userData');
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
          $cookieStore.put('userData', response);
          var userData = $cookieStore.get('userData');
          console.log(userData);
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

    //signout
    service.signout = function(){
      $cookieStore.remove('userData');
      $cookieStore.remove('eventId');
    }

    return service;
}]);