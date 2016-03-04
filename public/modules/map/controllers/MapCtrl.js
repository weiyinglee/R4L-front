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
    '$rootScope',
    '$location',
    '$http',
    'leafletData',
    '$timeout',
    '$compile',
    'BadgeFactory',
    'EventFactory',
    'PolygonFactory',
  function(
    $scope,
    $rootScope,
    $location,
    $http,
    leafletData,
    $timeout,
    $compile,
    BadgeFactory,
    EventFactory,
    PolygonFactory
     ){

    var COLORSTATUS = {
      damage   : 'RED',
      undamage : 'BLUE',
      unknown  : 'PURPLE'
    }

    $scope.mapType = "Satellite Images";
    $scope.tiles = tilesDict.digital_gobel_open_street_map;
    $scope.changeMap = function(){
      if($scope.mapType === "Satellite Images"){
        $scope.mapType = "Base Map";
        $scope.tiles = tilesDict.digital_gobel_base_map_street;
      }else{
        $scope.mapType = "Satellite Images";
        $scope.tiles = tilesDict.digital_gobel_open_street_map;
      }
    }

    angular.extend($scope, {
      center: {
        lng: 124.740348,
        lat: 11.379895,
        zoom: 14
      },
      default: {
      },
      marker: {
        newMarker: {
          lng: 124.740348,
          lat: 11.379895,
          opacity:0.0
        }
      },
      tiles: $scope.tiles
    });

    var layerMap = {};

    $scope.eventId = EventFactory.getEventId();
    var path = 'http://52.8.54.187:3000/event/' + $scope.eventId;

    //get the geojson data from backend API
    $http.get(path, {
      headers: {'Content-Type' : 'application/json'}
    }).success(function(data, status){

      var marker = null;
      var popup = null;

      leafletData.getMarkers().then(function(leafletMarkers){
        marker = leafletMarkers.newMarker;
        popup = L.popup().setContent('<status-button statusonclick="handlerclick(object)"></status-button>');
        marker.bindPopup(popup);   
      });

      data.features.forEach(function(data){
        data.geometry = JSON.parse(data.geometry);
        data.type = "Feature";
      });      

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

            layer.on('click', function(e){

              PolygonFactory.setFeature(feature);
              
              var lat = (e.latlng.lat);
              var lng = (e.latlng.lng);

              //marker move to centroid of polygon
              $scope.marker.newMarker = {
                lng: lng,
                lat: lat
              };

              $scope.marker.newMarker.layer_featureId = feature.id;

              marker.openPopup();

              if(layer.options.fillColor){
                
                handleCurrentStatus(layer, 'status');
                
                layer.setStyle({
                  fillColor: null,
                  fillOpacity: 0
                });
              }
            });
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

      console.log("HIII");

      var featureId = $scope.marker.newMarker.layer_featureId
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


          var nextLayer = layerMap[nextId];

          var nextPolygon = new L.LatLng(
            nextLayer.feature.properties.centroid.lat,
            nextLayer.feature.properties.centroid.lng);

          var currentPolygon = new L.LatLng(
            layer.feature.properties.centroid.lat,
            layer.feature.properties.centroid.lng);

          //check if the polygon is too far by 300 meters to improve use visibility
          if(currentPolygon.distanceTo(nextPolygon) > 300){
            leafletData.getMap('map').then(function(map){
              map.setView(nextPolygon, 17);
              setTimeout(function(){
                map.closePopup();
                map._layers[72].fire('click');
              }, 3000);
            });
          }
          return;
        }
      }

      setStyle(layer, status);

    };

    //compile directive on popup open
    $scope.$on('leafletDirectiveMap.map.popupopen', function(event, leafletEvent){
        var newScope = $scope.$new();

        // compile actuall html with angular property
        console.log(leafletEvent.leafletEvent.popup._contentNode);
        $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
      });

    $rootScope.$on('event_update', function(){
      $scope.eventId = EventFactory.getEventId();
    });

  }]);
