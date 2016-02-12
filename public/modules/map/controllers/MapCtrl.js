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

var MapController = App.controller('MapCtrl', [ '$scope', '$location', '$http', 'leafletData', '$timeout', '$compile',
  function($scope, $location, $http, leafletData, $timeout, $compile){
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
            fillOpacity: 0
          },
          onEachFeature: function(feature, layer) {

            var defaultColor = 'darkred';

            layer.on('click', function(){
              layer.setStyle({
                weight: 3,
                opacity: 1,
                color: defaultColor,
                fillOpacity: 0
              });
            });

            layer.bindPopup('<status-button statusOnClick="handlerclick(id, color)"></status-button>', {
              feature : feature,
              layer: layer
            });
          }
        }
      });
    });

    $scope.handlerclick = function(id, color){
      console.log(id);
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