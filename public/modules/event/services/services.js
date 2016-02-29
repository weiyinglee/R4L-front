'use strict';

App.factory('EventFactory', ['$rootScope', '$http', function($rootScope, $http){

  var service = {};

  //default path
  var polygonPath = '/assets/libs/polygon_coordinate.json';

  service.setPolygon = function(path){
  	polygonPath = path;
  	this.eventUpdate();
  }

  service.eventUpdate = function() {
    $rootScope.$emit('event_update');
  }

  service.getPolygon = function(){
  	return polygonPath;
  }

  return service;
}]);
