'use strict';

App.factory('UserFactory', ['$rootScope', '$http', '$mdDialog','$resource', "$location", "$cookieStore",
  function($rootScope, $http, $mdDialog, $resource, $location, $cookieStore){

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
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('.register-container')))
                .clickOutsideToClose(true)
                .title('Oops!')
                .textContent('This user has already existed. Please try again!')
                .ok('Try again!')
            ).then(function(){
              location.reload();
            });
         }
      }, function(error){
        console.log(error);
    	});
    }

    //login
    service.userLogin = function(data){
    	$http.post('http://52.8.54.187:3000/user/login', data).then(function(response){
          $cookieStore.put('userData', response);
          var userData = $cookieStore.get('userData');
          if(userData.data.success){
            //enter the event page
            $location.path('/events');
          }else{
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('.login-container')))
                .clickOutsideToClose(true)
                .title('Oops!')
                .textContent('Invalid username/password. Please try again!')
                .ok('Try again!')
            ).then(function(){
              location.reload();
            });
 
          }
    	}, function(error){
        console.log(error);
    	});
    }

    //signout
    service.signout = function(){
      $cookieStore.remove('userData');
      $cookieStore.remove('eventId');
      $cookieStore.remove('eventCentroid');
      $cookieStore.remove('polygonCount');
    }

    return service;
}]);