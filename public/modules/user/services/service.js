App.factory('UserFactory', ['$rootScope', '$http', function($rootScope, $http){
  
  var service = {};

  //create
  service.userCreate = function(){
  	
  	var data = {
  	};

  	$http.post('/user/create', data).then(function(response){
  	}, function(error){
  		console.log('Create failed' + error);
  	});
  }

  //login
  service.userLogin = function(){

  	var data = {

  	}

  	$http.post('/user/login', data).then(function(response){
  	}, function(error){
  		console.log('login failed' + error);
  	});
  }

  return service;
}]);