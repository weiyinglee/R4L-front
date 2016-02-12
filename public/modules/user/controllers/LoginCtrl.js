'use strict';

var LoginController = App.controller('LoginCtrl', [ '$scope', '$http',
	function($scope, $http){
	  $scope.userName = "";
	  $scope.userPassword = "";
	  
	  //Authentication for login
	  $scope.auth = function(){
	  	
	  	//authentication backend API
	  	var inputData = {
	  		name: userName,
	  		password: userPassword
	  	};

	  	$http.post('', inputData).then(function(response){
	  		//Do something
	  	}, function(error){
	  		console.error(error);
	  	});
	  };

  	}]);