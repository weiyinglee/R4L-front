'use strict';

var LoginController = App.controller('LoginCtrl', [ 
	'$scope',
	'$http',
	'$timeout',
	'$mdDialog',
	'UserFactory',
	'$rootScope',
	function(
	  $scope,
	  $http,
	  $timeout,
	  $mdDialog,
	  UserFactory,
	  $rootScope
	  ){
	  
	  $scope.userName = "";
	  $scope.userPassword = "";

	  $scope.fieldIncompleted = function(){
	  	var name = $scope.userName;
	  	var pw = $scope.userPassword;
	  	return name == "" || pw == "";
	  }

	  //Authentication for login
	  $scope.auth = function(){
	  	
	  	var inputData = {
	  	  username: $scope.userName,
	  	  password: $scope.userPassword
	  	};

	  	UserFactory.userLogin(inputData);
	  }

  	}]);