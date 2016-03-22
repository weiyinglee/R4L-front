App.factory('BadgeFactory', ['$rootScope', function($rootScope){

  var badgeCount = {
    damage           : 0,
    undamage         : 0,
    unknown          : 0,
    remain           : 20
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

  service.getGeojson = function(path) {
    var promise;
    var polygons = {
      async: function() {
        if(!promise) {
          promise = $http.get(path, { headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer' + UserFactory.getUserData().data.token
          }}).then(function(data){
            return data;
          });
        }
        return promise;
      }
    };
    return polygons;
  }

  service.savePolygon = function(path, data) {
    $http.post(path, { headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer' + UserFactory.getUserData().data.token
          }}, data).then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
    });
  }

  return service;
}]);

