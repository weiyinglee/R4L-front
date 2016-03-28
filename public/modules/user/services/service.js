'use strict';

App.factory('UserFactory', ['$rootScope', '$http', '$resource', "$location", "$cookieStore", "EventFactory",
  function($rootScope, $http, $resource, $location, $cookieStore, EventFactory){

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
            $http.get('http://52.8.54.187:3000/event', {
              headers: {
                "Authorization": 'Bearer ' + userData.data.token
              }
            }).then(function(response){
              $location.path('/events');
              EventFactory.setEvent(response);
              console.log(response);
            });
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
            $http.get('http://52.8.54.187:3000/event', {
              headers: {
                "Authorization": 'Bearer ' + userData.data.token
              }
            }).then(function(response){
              $location.path('/events');
              EventFactory.setEvent(response);
              console.log(response);
            });
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