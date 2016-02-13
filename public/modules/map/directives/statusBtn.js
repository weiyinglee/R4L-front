'use strict';

//status btn
App.directive('statusButton', function($http, leafletData, $timeout){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    controller: 'MapCtrl',
    scope: {
      handlerclick: '&'
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
            scope.handlerclick({status: 'damage', id: scope.$parent.feature.id, color: "red"});
            break;
          case 'fine':
            if(timer){
              $timeout.cancel(timer);
              timer = null;
            }
            timer = $timeout(function(){
              //save the data to database
              console.log('fine saved to database');
            }, 3000);
            scope.handlerclick({status: 'fine', id: scope.$parent.feature.id, color: "blue"});
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
            scope.handlerclick({status: 'unknown', id: scope.$parent.feature.id, color: "purple"});
            break;
          case 'next':
            scope.handlerclick({status: 'next', id: scope.$parent.feature.id, color: null});
            break;
        }
      };
    }
  }
});