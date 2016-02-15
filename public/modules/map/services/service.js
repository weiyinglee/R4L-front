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

