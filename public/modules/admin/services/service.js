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
        location.reload();
      }, function(error){
        alert("fail to upload event");
        location.reload();
        });
      }
    }

    service.getData = function(id){
      var promise;
      var data = {
      async: function() {
        if(!promise) {
          promise = $http.get('http://52.8.54.187:3000/event/' + id + '/data',
          {
            headers: {
              "Authorization": 'Bearer ' + UserFactory.getUserData().data.token,
              "x-username" : UserFactory.getUserData().data.username
            }
          }).then(function(data){
            return data;
          });
        }
        return promise;
      }
    };
    return data;
  }

    return service;
}]);