'use strict';

//status btn
App.directive('statusButton', [ '$timeout', 'BadgeFactory', "$rootScope", function($timeout, BadgeFactory, $rootScope){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    scope: {
      statusOnClick: '&statusonclick',
      leaflet_feature_id : '=featureid'
    },
    link: function(scope, element, attrs) {
      scope.badge = BadgeFactory.getBadges();

      //default images for each status button
      scope.damageImg  = '/assets/img/damage.png';
      scope.fineImg    = '/assets/img/fine.png';
      scope.unknownImg = '/assets/img/unknown.png';
      scope.nextImg    = '/assets/img/next.png';

      var timer = null;
      //status buttons onclick
      scope.btnAction = function(status){
        scope.statusOnClick({
          object : {
            featureId : scope.leaflet_feature_id,
            status    : status
          }
        });
      }

      $rootScope.$on('badge_update', function(){
        scope.badge = BadgeFactory.getBadges();
      })
    }
  }
}]);
