'use strict';

App.factory('EventFactory', ['$rootScope', '$http', function($rootScope, $http){

  var service = {};

  //default path
  var eventId = 0;

  service.setEventId = function(Id){
    eventId = Id;
    this.eventUpdate();
  }

  service.eventUpdate = function() {
    $rootScope.$emit('event_update');
  }

  service.getEventId = function(){
    return eventId;
  }

  return service;
}]);
