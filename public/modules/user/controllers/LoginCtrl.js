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
	  };

	  $rootScope.$on('user_update', function(){
        $scope.userData = UserFactory.getUserData();
      });

  	}]);