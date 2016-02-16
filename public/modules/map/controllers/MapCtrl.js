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

var MapController = App.controller('MapCtrl', [
    '$scope',
    '$location',
    '$http',
    'leafletData',
    '$timeout',
    '$compile',
    'BadgeFactory',
  function(
    $scope,
    $location,
    $http,
    leafletData,
    $timeout,
    $compile,
    BadgeFactory
     ){

    var COLORSTATUS = {
      damage   : 'RED',
      undamage : 'BLUE',
      unknown  : 'PURPLE'
    }

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

    var layerMap = {};

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
            layerMap[feature.id] = layer;

            layer.on('click', function(){
              if(layer.options.fillColor){
                
                handleCurrentStatus(layer, 'status');
                
                layer.setStyle({
                  fillColor: null,
                  fillOpacity: 0
                });
              }
            });

            // statusOnClick on directive will turned to lowercase. I warned you about this, you can look at directive and see
            // i did the mapping &statusonclick
            layer.bindPopup('<status-button statusonclick="handlerclick(object)" featureid='+feature.id+'></status-button>');
          }
        }
      });
    });

    var setStyle = function(layer, status) {
      layer.setStyle({
        fillColor : COLORSTATUS[status],
        fillOpacity : 1.0
      })
    };

    var handleCurrentStatus = function(layer, status){
      if (layer.options.fillColor && status != 'next') {
        var currentStatus;
        angular.forEach(COLORSTATUS, function(v, k){
          if (v == layer.options.fillColor) currentStatus = k;
        });
        BadgeFactory.decStatus(currentStatus);
      }
    };

    $scope.handlerclick = function(object) {
      var featureId = object.featureId;
      var status    = object.status;

      var nextId = featureId + 1;
      var fillColor = object.color;

      var layer = layerMap[featureId];
      var changeColor = null;

      // check if current feature has been colored
      // if the polygon has not been filled, then do the counting
      // if already fill, then decrese the count by 1
      // and increate remian by 1
      handleCurrentStatus(layer, status);

      switch(status) {
        case 'damage' : {
          BadgeFactory.incDamage();
          break;
        }
        case 'undamage' : {
          BadgeFactory.incUnDamage();
          break;
        }
        case 'unknown' : {
          BadgeFactory.incUnKnown();
          break;
        }
        default : {
          //handle the jump next polygon

          var nextLayer;
          var nextLng;
          var nextLat;
          var nextLayer;
          var nextPolygon;
          
          /*
          var nextLayer = layerMap[nextId];

          var nextLng = nextLayer.feature.properties.centroid.lng;
          var nextLat = nextLayer.feature.properties.centroid.lat;

          var currentLng = layer.feature.properties.centroid.lng;
          var currentLat = layer.feature.properties.centroid.lat;

          var nextPolygon = new L.LatLng(nextLat, nextLng);
          var currentPolygon = new L.LatLng(currentLat, currentLng);

          console.log(nextPolygon);
          console.log(currentPolygon);

          //check if the polygon is too far by 300 meters to improve use visibility
          if(currentPolygon.distanceTo(nextPolygon) > 300){
            leafletData.getMap('map').then(function(map){
              console.log(nextPolygon);
              map.panTo(nextPolygon, 18);
            });
          }

          layerMap[nextId].fire('click');
          */
          
          if(nextId < Object.keys(layerMap).length){
            nextLayer = layerMap[nextId];
            nextLng = nextLayer.feature.properties.centroid.lng;
            nextLat = nextLayer.feature.properties.centroid.lat;
          }else{
            //last polygon, next jump back to first layer
            nextLng = 124.740348;
            nextLat = 11.379895;
          }

          nextPolygon = new L.LatLng(nextLat, nextLng);
          
          leafletData.getMap('map').then(function(map){
            map.setView(nextPolygon, 18);
          });

          return;
        }
      }

      setStyle(layer, status);

    };

    //compile directive on popup open
    $scope.$on('leafletDirectiveMap.map.popupopen', function(event, leafletEvent){
        var newScope = $scope.$new();

        // compile actuall html with angular property
        $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
      });
  }]);
