'use strict';

var LoginController = App.controller('LoginCtrl', [ 
	'$scope',
	'$http',
	'UserFactory',
	'$rootScope',
	function(
	  $scope,
	  $http,
	  UserFactory,
	  $rootScope
	  ){
	  
	  $scope.userData = UserFactory.getUserData();

	  $scope.userName = "";
	  $scope.userPassword = "";
	  $scope.signName = "";
	  $scope.signPassword = "";
	  
	  //Create an user
	  $scope.signUp = function(){

	  	var inputData = {
	  	  user: $scope.signName,
	  	  password: $scope.signPassword
	  	}

	  	UserFactory.userCreate(inputData);
	  };

	  //Authentication for login
	  $scope.auth = function(){
	  	
	  	var inputData = {
	  	  user: $scope.userName,
	  	  password: $scope.userPassword
	  	};

	  	UserFactory.userLogin(inputData);
	  };

	  $rootScope.$on('user_update', function(){
        $scope.userData = UserFactory.getUserData();
      });

  	}]);