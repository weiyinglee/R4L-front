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

      //status buttons onclick
      scope.btnAction = function(status){

        switch(status){
          case 'damage':
            scope.handlerclick({status: 'damage', id: scope.$parent.feature.id, color: "red"});
            break;
          case 'fine':
              scope.handlerclick({status: 'fine', id: scope.$parent.feature.id, color: "blue"});
            break;
          case 'unknown':
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