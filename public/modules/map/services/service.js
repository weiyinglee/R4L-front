App.service('badgeService', function(){

  //default badges for each status (should get from database later)
  this.damageBadge = 0;
  this.fineBadge = 0;
  this.unknownBadge = 0;
  this.nextBadge = 20;

});