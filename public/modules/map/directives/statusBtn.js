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

        //counter for three seconds
        console.log(scope.feature);
        switch(status){
          case 'damage':
            /*
            scope.layer.setStyle({
              color: null,
              fillColor: 'red',
              fillOpacity: 1.0,
              Opacity: 0.0
            });
            */
            scope.handlerclick({id: scope.feature.id, color: 'red'});
            break;
          case 'fine':
          /*
            scope.layer.setStyle({
                color: null,
                fillColor: 'blue',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
          */
            scope.handlerclick({id: scope.feature.id, color: 'blue'});
            break;
          case 'unknown':
          /*
            scope.layer.setStyle({
                color: null,
                fillColor: 'purple',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
          */
            scope.handlerclick({id: scope.feature.id, color: 'purple'});
            break;
          case 'next':
            scope.handlerclick({id: scope.feature.id, color: null});
            break;
        }
        
      };

      //next btn onclick: go to next area
      scope.nextArea = function(){

        var currentId = parseInt(scope.feature.id); //current polygon position
        var nextId = currentId + 1;

        $http.get('/assets/libs/polygon_coordinate.json').success(function(data, status){

          var nextPolygon = data.features[nextId].properties.centroid;
          var nextLatLng = new L.LatLng(nextPolygon.lat, nextPolygon.lng);
          //change the center of next polygon
          leafletData.getMap('map').then(function(map){
            map.setView(nextLatLng, 18);
          });
        });

      };
    
    }
  }
});