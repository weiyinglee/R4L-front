'use strict';

//status btn
App.directive('statusButton', function($http, leafletData, $timeout){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {

      //default images for each status button
      scope.damageImg = '/assets/img/damage.png';
      scope.fineImg = '/assets/img/fine.png';
      scope.unknownImg = '/assets/img/unknown.png';
      scope.nextImg = '/assets/img/next.png';

      scope.rest = false; //for set timeout to make button pause a little after clicked

      //create te different image src
      scope.imgSrc = function(status, action){
        var statusImg = status + action;
        var src = '/assets/img/' + statusImg + '.png';
        switch(status){
          case 'damage':
            scope.damageImg = src;
            break;
          case 'fine':
            scope.fineImg = src;
            break;
          case 'unknown':
            scope.unknownImg = src;
            break;
          case 'next':
            scope.nextImg = src;
            break;
        }
      };

      //status buttons onclick
      scope.btnAction = function(status){
        scope.rest = true;
        switch(status){
          case 'damage':
            scope.layer.setStyle({
              color: null,
              fillColor: 'red',
              fillOpacity: 1.0,
              Opacity: 0.0
            });
            console.log('damage save to DataBase!');
            break;
          case 'fine':
            scope.layer.setStyle({
                color: null,
                fillColor: 'blue',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
              console.log('fine save to DataBase!');
            break;
          case 'unknown':
            scope.layer.setStyle({
                color: null,
                fillColor: 'purple',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
              console.log('unknown save to DataBase!');
            break;
        }
        //After click, wait for three seconds to be function again
        $timeout(function(){
          scope.rest = false;
        }, 3000);
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