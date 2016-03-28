'use strict';

App.factory('EventFactory', ['$rootScope', '$cookieStore', function($rootScope, $cookieStore){

  var service = {};

  service.setEvent = function(events){
    $cookieStore.put('events', events);
  }

  service.getEvent = function(){
    return $cookieStore.get('events');
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
