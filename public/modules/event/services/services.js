'use strict';

App.factory('EventFactory', ['$rootScope', '$http', '$cookieStore', 'UserFactory', function($rootScope, $http, $cookieStore, UserFactory){

  var service = {};

  service.getEvent = function(path){
    var promise;
    var events = {
      async: function() {
        if(!promise) {
          promise = $http.get(path,
          {
            headers: {
              "Authorization": 'Bearer ' + UserFactory.getUserData().data.token
            }
          }).then(function(data){
            return data;
          });
        }
        return promise;
      }
    };
    return events;
  }

  service.setEventId = function(Id){
    $cookieStore.put('eventId', Id);
    this.eventUpdate();
  }

  service.eventUpdate = function() {
    $rootScope.$emit('event_update');
  }

  service.getEventId = function(){
    return $cookieStore.get('eventId');
  }

  return service;
}]);
