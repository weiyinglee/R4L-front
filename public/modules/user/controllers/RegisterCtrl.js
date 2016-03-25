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

	  $scope.invalid1 = false;
	  $scope.invalid2 = false;
	  $scope.invalid3 = false;

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
	  		$scope.invalid1 = false;
	  		$scope.invalid2 = true;
	  		$scope.invalid3 = false;
	  		fieldClear();
	  		return;
	  	}

	  	if($scope.userId.indexOf("-") > -1){
	  		$scope.invalid1 = false;
	  		$scope.invalid2 = false;
	  		$scope.invalid3 = true;
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

	  	if(!$scope.userData.data.success){
	  	  $scope.invalid1 = true;
	  	  $scope.invalid2 = false;
	  	  $scope.invalid3 = false;
	  	  fieldClear();
	  	}
	  };

	  $rootScope.$on('user_update', function(){
        $scope.userData = UserFactory.getUserData();
      });

  	}]);