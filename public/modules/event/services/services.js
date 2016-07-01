'use strict';

App.factory('EventFactory', ['$rootScope', '$http', '$cookieStore', 'UserFactory', 'baseUrl', function($rootScope, $http, $cookieStore, UserFactory, baseUrl){

  var service = {};

  service.getEvent = function getEvent(path) {
    var promise;
    var events = {
      async: function() {
        if(!promise) {
          promise = $http.get(path,
          {
            headers: {
              "Authorization": 'Bearer ' + UserFactory.getUserData().data.token,
              "x-username" : UserFactory.getUserData().data.username
            }
          }).then(function onFullfilled(data) {
            return data;
          });
        }
        return promise;
      }
    };
    return events;
  }

  service.setEventCount = function(c){
    $cookieStore.remove('polygonCount');
    $cookieStore.put('polygonCount', c);
    this.eventUpdate();
  }

  service.getEventCount = function(){
    return $cookieStore.get('polygonCount');
  }

  service.setEventCentroid = function(c) {
    $cookieStore.remove('eventCentroid');
    $cookieStore.put('eventCentroid', c);
    this.eventUpdate();
  }

  service.getEventCentroid = function() {
    return $cookieStore.get('eventCentroid');
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

  service.delEvent = function(id){
    $http.delete(`${ baseUrl }:3000/event/` + id, {
      headers: {
        "Authorization": "Bearer " + UserFactory.getUserData().data.token,
        "x-username": UserFactory.getUserData().data.username
      }
    }).then(function(res){
      alert('Successfully delete the event: ID ' + id);
      location.reload();
    },function(error){
      alert("Fail to delete the event ID " + id);
      location.reload();
    });
  }

  return service;
}]);
