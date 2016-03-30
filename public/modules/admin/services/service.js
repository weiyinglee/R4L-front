'use strict';

App.factory('UploadFactory', ["$rootScope", "$http", "Upload", "UserFactory", function($rootScope, $http, Upload, UserFactory){
  
  var service = {};

  service.fileUpload = function(name, description, file, image) {
  	$http.post('http://52.8.54.187:3000/ping',{ 
  		  featureCollection: file,
  		  eventName: name,
  		  description: description,
  		  imageUrl: image,
  		  username: UserFactory.getUserData().data.username
  		}, {
  			headers: {
  				"Authorization": 'Bearer ' + UserFactory.getUserData().data.token
  			}
  		}
  	).then(function(res){
  		console.log(res);
  		alert("successfully upload event!");
  		location.reload();
  	}, function(error){
  		alert("fail to upload event");
  	});

  }

  return service;
}]);