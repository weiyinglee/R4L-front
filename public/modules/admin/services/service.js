'use strict';

App.factory('AdminFactory', ["$rootScope", "$http", "$cookieStore", "$location", "Upload", "UserFactory", "EventFactory", 
  function($rootScope, $http, $cookieStore, $location, Upload, UserFactory, EventFactory){
  
    var service = {};

    service.fileUpload = function(name, description, file) {

      var fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function(e){
        $http.post('http://52.8.54.187:3000/event',{ 
          featureCollection: JSON.parse(e.target.result),
          eventName: name,
          description: description
        }, {
          headers: {
            "Authorization": 'Bearer ' + UserFactory.getUserData().data.token,
            "x-username": UserFactory.getUserData().data.username
          }
        }
      ).then(function(res){
        alert("successfully upload event!");
        console.log(res);
        location.reload();
      }, function(error){
        alert("fail to upload event");
        console.log(error);
        location.reload();
        });
      }
    }

    service.getData = function(id){
      $http.get('http://52.8.54.187:3000/event/' + id + '/data', {
        headers: {
          "Authorization": 'Bearer ' + UserFactory.getUserData().data.token
        }
      }).then(function(res){
        console.log(res);
      });
    }

    return service;
}]);