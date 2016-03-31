'use strict';

App.factory('UploadFactory', ["$rootScope", "$http", "$cookieStore", "$location", "Upload", "UserFactory", "EventFactory", 
  function($rootScope, $http, $cookieStore, $location, Upload, UserFactory, EventFactory){
  
    var service = {};

    service.fileUpload = function(name, description, file, image) {

      var fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function(e){
        $http.post('http://52.8.54.187:3000/ping',{ 
          featureCollection: JSON.parse(e.target.result),
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
        alert("successfully upload event!");
        console.log(res);
        location.reload();
      }, function(error){
        alert("fail to upload event");
        location.reload();
      });
      }


    }

    return service;
}]);