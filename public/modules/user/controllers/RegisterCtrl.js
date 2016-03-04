'use strict';

var RegisterController = App.controller('RegisterCtrl', [ 
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

	  $scope.userId = "";
	  $scope.firstName = "";
	  $scope.lastName = "";
	  $scope.userEmail = "";
	  $scope.signPassword = "";
	  $scope.reSignPassword = "";
	  
	  //Create an user
	  $scope.signUp = function(){

	  	if($scope.signPassword != $scope.reSignPassword){
	  		alert("Two passwords are not the same, please try again!");
	  		location.reload();
	  	}

	  	var inputData = {
	  	  username: $scope.userId,
	  	  firstName: $scope.firstName,
	  	  lastName: $scope.lastName,
	  	  email: $scope.userEmail,
	  	  password: $scope.signPassword
	  	}

	  	UserFactory.userCreate(inputData);
	  };

	  $rootScope.$on('user_update', function(){
        $scope.userData = UserFactory.getUserData();
      });

  	}]);