'use strict';

var tilesDict = {
  digital_gobel_base_map: {
    url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    options: {
      apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
      mapid: 'digitalglobe.nmghof7o',
      minZoom: 2
    }
  },
  digital_gobel_base_map_street: {
    url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    options: {
      apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
      mapid: 'digitalglobe.nmgi4k9c',
      minZoom: 2
    }
  },
  digital_gobel_open_street_map: {
    url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    options: {
      apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
      mapid: 'digitalglobe.n6nhn7mg',
      minZoom: 2
    }
  }
}

var MapController = App.controller('MapCtrl', [ '$scope', '$location', '$http', 'leafletData', '$timeout', '$compile', 'badgeService',
  function($scope, $location, $http, leafletData, $timeout, $compile, badgeService){
    
    $scope.badge = badgeService;

    angular.extend($scope, {
      center: {
        lng: 124.740348,
        lat: 11.379895,
        zoom: 14
      },
      default: {
      },
      tiles: tilesDict.digital_gobel_open_street_map
    });

    //get the geojson data from backend API
    $http.get('/assets/libs/polygon_coordinate.json').success(function(data, status){      
      angular.extend($scope, {
        geojson: {
          data: data,
          style: {
            weight: 3,
            opacity: 1,
            color: 'darkred',
            fillColor: null,
            fillOpacity: 0
          },
          onEachFeature: function(feature, layer) {

            var defaultColor = 'darkred';

            layer.on('click', function(){
              switch(layer.options.fillColor){
                case 'red':
                  $scope.badge.damageBadge--;
                  $scope.badge.nextBadge++;
                  break;
                case 'blue':
                  $scope.badge.fineBadge--;
                  $scope.badge.nextBadge++;
                  break;
                case 'purple':
                  $scope.badge.unknownBadge--;
                  $scope.badge.nextBadge++;
                  break;            
              }
              layer.setStyle({
                weight: 3,
                opacity: 1,
                color: defaultColor,
                fillColor: null,
                fillOpacity: 0
              });
            });

            layer.bindPopup('<status-button statusOnClick="handlerclick(object)"></status-button>', {
              feature : feature,
              layer: layer
            });
          }
        }
      });
    });


    $scope.handlerclick = function(object) {
      var status = object.status;
      var id = object.id;
      var nextId = id + 1;
      var fillColor = object.color;

      if(status != 'next'){
        
        //add the status badge
        switch(fillColor){
          case 'red':
            $scope.badge.damageBadge++;
            break;
          case 'blue':
            $scope.badge.fineBadge++;
            break;
          case 'purple':
            $scope.badge.unknownBadge++;
            break;
          default:
            $scope.badge.nextBadge++;
            break;
        }

        //do the logic for non-next buttons
        $scope.$parent.layer.setStyle({
          color: null,
          fillColor: fillColor,
          fillOpacity: 1.0,
          Opacity: 0.0
        });
      }else{
        //do the logic for next button
        if($scope.$parent.geojson.data.features[nextId] === undefined){
          console.log('not exist');
        }
        console.log($scope.$parent.geojson.data.features[id]);
        //when the I proceed to click more polygons, the program will crash somehow.


        /*
          var nextPolygon = data.features[nextId].properties.centroid;
          var nextLatLng = new L.LatLng(nextPolygon.lat, nextPolygon.lng);
          //change the center of next polygon
          leafletData.getMap('map').then(function(map){
            map.setView(nextLatLng, 18);
          });
        */
      }
    };

    //compile directive on popup open
    $scope.$on('leafletDirectiveMap.map.popupopen', function(event, leafletEvent){

        // Create the popup view when is opened
        var feature = leafletEvent.leafletEvent.popup.options.feature;
        var layer = leafletEvent.leafletEvent.popup.options.layer;

        var newScope = $scope.$new();
        newScope.feature = feature;
        newScope.layer = layer;

        // compile actuall html with angular property
        $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
      });
  }]);