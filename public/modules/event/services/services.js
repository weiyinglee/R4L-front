'use strict';

App.factory('EventFactory', ['$rootScope', '$cookieStore', function($rootScope, $cookieStore){

  var service = {};

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
