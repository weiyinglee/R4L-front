'use strict';

//status btn
App.directive('statusButton', function($http, leafletData, $timeout, badgeService){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    controller: 'MapCtrl',
    scope: {
      handlerclick: '&',
    },
    link: function(scope, element, attrs) {

      //default images for each status button
      scope.damageImg = '/assets/img/damage.png';
      scope.fineImg = '/assets/img/fine.png';
      scope.unknownImg = '/assets/img/unknown.png';
      scope.nextImg = '/assets/img/next.png';

      var timer = null;

      //status buttons onclick
      scope.btnAction = function(status){

        var thisFeature = scope.$parent.feature;
        var thisLayer = scope.$parent.layer;
        var originColor = null;

        //decrease the original status badge since it's been updated/changed
        if(status != 'next'){
          switch(thisLayer.options.fillColor){
            case 'red':
              scope.badge.damageBadge--;
              break;
            case 'blue':
              scope.badge.fineBadge--;
              break;
            case 'purple':
              scope.badge.unknownBadge--;
              break;
            default:
              scope.badge.nextBadge--;
              break;
          }
        }

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

            scope.handlerclick({status: 'damage', id: thisFeature.id, color: "red"});
            
            break;
          case 'fine':
            
            if(timer){
              $timeout.cancel(timer);
              timer = null;
            }
            timer = $timeout(function(){
              console.log('fine saved to database');
            }, 3000);
            scope.handlerclick({status: 'fine', id: thisFeature.id, color: "blue"});
            
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
            scope.handlerclick({status: 'unknown', id: thisFeature.id, color: "purple"});
            
            break;
          case 'next':
            scope.handlerclick({status: 'next', id: thisFeature.id, color: null});
            break;
        }
      };
    }
  }
});