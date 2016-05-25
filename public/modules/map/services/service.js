'use strict';

App.factory('BadgeFactory', ['$rootScope', 'EventFactory', function($rootScope, EventFactory){

  var count = EventFactory.getEventCount();

  $rootScope.$on('event_update', function(){
    count = EventFactory.getEventCount();
  });

  var badgeCount = {
    damage           : 0,
    undamage         : 0,
    unknown          : 0,
    remain           : count
  }

  var service = {};

  service.getDamage = function() {
    return badgeCount.damage;
  }

  service.getUnDamage = function() {
    return badgeCount.undamage;
  }

  service.getUnKnown = function() {
    return badgeCount.unknown;
  }

  service.getTotal = function() {
    return badgeCount.remain;
  }

  service.getBadges = function(){
    return {
      damage   : badgeCount.damage,
      undamage : badgeCount.undamage,
      unknown  : badgeCount.unknown,
      remain   : badgeCount.remain
    }
  }

  service.resetBadges = function() {
    badgeCount = {
        damage           : 0,
        undamage         : 0,
        unknown          : 0,
        remain           : count
      }
  }

  service.broadcastUpdate = function() {
    $rootScope.$emit('badge_update');
  }

  service.incDamage = function() {
    badgeCount.damage++;
    badgeCount.remain--;
    this.broadcastUpdate();
  }

  service.incUnDamage = function() {
    badgeCount.undamage++;
    badgeCount.remain--;
    this.broadcastUpdate();
  }

  service.incUnKnown = function() {
    badgeCount.unknown++;
    badgeCount.remain--;
    this.broadcastUpdate();
  }

  service.decStatus = function(status) {
    badgeCount[status]--;
    badgeCount.remain++;
    this.broadcastUpdate();
  }

  return service;
}]);

App.factory("SubPolygonFactory", ["$rootScope", "$http", "UserFactory", function ($rootscope, $http, UserFactory) {
  var service = {}, feature = {}

  service.featureUpdate = function featureUpdate() {
    $rootScope.$emit("Feature_update")
  }

  service.setFeature = function setFeature(object) {
    feature = object
    this.featureUpdate()
  }

  service.getGeoJson = function getGeoJson(path, bounds, username) {
    var promise;
    var polygons = {
      "async" : function() {
        if (!promise) {
          promise = $http.get(path, {
            params: bounds,
            headers: {
              "Content-Type": 'application/json',
              "Authorization": 'Bearer ' + UserFactory.getUserData().data.token,
              "x-username": username || UserFactory.getUserData().data.username
            }
          }).then(function then(data) {
            return data;
          });
        }
        return promise;
      }
    };
    return polygons;
  }

  return service;
}])

App.factory('PolygonFactory', ["$rootScope", "$http", "UserFactory", function($rootScope, $http, UserFactory){

  var service = {};

  var feature = {};

  service.setFeature = function(object) {
    feature = object;
    this.featureUpdate();
  }

  service.featureUpdate = function() {
    $rootScope.$emit('Feature_update');
  }

  service.getFeature = function() {
    return feature;
  }

  service.getGeojson = function(path, bounds, username) {
    console.log(`param: ${username}\nfactory:${UserFactory.getUserData().data.username}`)
    var promise;
    var polygons = {
      async: function() {
        if(!promise) {
          promise = $http.get(path,
          {
            params: {},
            headers: {
              "Content-Type": 'application/json',
              "Authorization": 'Bearer ' + UserFactory.getUserData().data.token,
              "x-username": username || UserFactory.getUserData().data.username
            }
          }).then(function(data){
            return data;
          });
        }
        return promise;
      }
    };
    return polygons;
  }

  service.savePolygon = function(path, data) {
    $http.post(path, data, { headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + UserFactory.getUserData().data.token,
      "x-username" : UserFactory.getUserData().data.username
    }}).then(function(response){
          console.log("Successfully save the vote for " + data.status);
          console.log(response);
      }, function(error){
        console.log(error);
    });
  }

  return service;
}]);
