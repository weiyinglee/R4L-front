'use strict';

var RegisterController = App.controller('RegisterCtrl', [ 
	'$scope',
	'$http',
	'$mdDialog',
	'UserFactory',
	'$rootScope',
	function(
	  $scope,
	  $http,
	  $mdDialog,
	  UserFactory,
	  $rootScope
	  ){
	  
	  $scope.userId = "";
	  $scope.firstName = "";
	  $scope.lastName = "";
	  $scope.userEmail = "";
	  $scope.signPassword = "";
	  $scope.reSignPassword = "";

	  function fieldClear() {
	  	$scope.userId = "";
		$scope.firstName = "";
		$scope.lastName = "";
		$scope.userEmail = "";
		$scope.signPassword = "";
	  	$scope.reSignPassword = "";
	  }

	  $scope.fieldIncompleted = function(){
	  	var id = $scope.userId;
	  	var first = $scope.firstName;
	  	var last = $scope.lastName;
	  	var email = $scope.userEmail;
	  	var pw = $scope.signPassword;
	  	var rePw = $scope.reSignPassword;

	  	return id == "" || first == "" ||
	  		   last == "" || email == "" ||
	  		   pw == "" || rePw == "";	
	  }
	  
	  //Create an user
	  $scope.signUp = function(){

	  	if($scope.signPassword != $scope.reSignPassword){
	  		$mdDialog.show(
	  			$mdDialog.alert()
	  				.parent(angular.element(document.querySelector('.register-container')))
	  				.clickOutsideToClose(true)
	  				.title('Oops!')
	  				.textContent('Two passwords are not the same. Please try again!')
	  				.ok('Try again!')
	  		);
	  		fieldClear();
	  		return;
	  	}

	  	if($scope.userId.indexOf("-") > -1){
	  		$mdDialog.show(
	  			$mdDialog.alert()
	  				.parent(angular.element(document.querySelector('.register-container')))
	  				.clickOutsideToClose(true)
	  				.title('Oops!')
	  				.textContent('The fields cannot contain character " - ". Please try again!')
	  				.ok('Try again!')
	  		);
	  		fieldClear();
	  		return;
	  	}

	  	var inputData = {
	  	  username: $scope.userId,
	  	  first_name: $scope.firstName,
	  	  last_name: $scope.lastName,
	  	  email: $scope.userEmail,
	  	  password: $scope.signPassword
	  	}

	  	UserFactory.userCreate(inputData);
	  };

	  $rootScope.$on('user_update', function(){
	  	if(UserFactory.getUserData() != undefined && !UserFactory.getUserData().data.success){
	  	  $mdDialog.show(
	  		  $mdDialog.alert()
	  			  .parent(angular.element(document.querySelector('.register-container')))
	  			  .clickOutsideToClose(true)
	  			  .title('Oops!')
	  			  .textContent('This user has already existed. Please try again!')
	  			  .ok('Try again!')
	  	  );
	  	  fieldClear();
	  	}
      });

  	}]);