'use strict';

//status btn
App.directive('statusButton', [ '$timeout', 'BadgeFactory', "$rootScope", function($timeout, BadgeFactory, $rootScope){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    scope: {
      statusOnClick: '&statusonclick',
      handlerclick: '&handlerclick'
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
        switch(status){
          case 'damage':
            
            if(timer){
              $timeout.cancel(timer);
              timer = null;
            }

            timer = $timeout(function(){
              //save the data to database
              console.log('damage saved to database');
            }, 3000);
            
            break;
          case 'undamage':
            
            if(timer){
              $timeout.cancel(timer);
              timer = null;
            }
            timer = $timeout(function(){
              console.log('fine saved to database');
            }, 3000);
            
            break;
          case 'unknown':
            
            if(timer){
              $timeout.cancel(timer);
              timer = null;
            }
            timer = $timeout(function(){
              //save the data to database
              console.log('unknown saved to database');
            }, 3000);
            
            break;
        }
        scope.statusOnClick({
          object : {
            status    : status
          }
        });
      }

      $rootScope.$on('badge_update', function(){
        scope.badge = BadgeFactory.getBadges();
      });
    }
  }
}]);
