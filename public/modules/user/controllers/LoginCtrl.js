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

	  	if(!$scope.userData.data.success){
	  		$mdDialog.show(
	  			$mdDialog.alert()
	  				.parent(angular.element(document.querySelector('.login-container')))
	  				.clickOutsideToClose(true)
	  				.title('Oops!')
	  				.textContent('Invalid username/password. Please try again!')
	  				.ok('Try again!')
	  		);
	  		$scope.userName = "";
	  		$scope.userPassword = "";
	  	}
	  };

	  $rootScope.$on('user_update', function(){
        $scope.userData = UserFactory.getUserData();
      });

  	}]);