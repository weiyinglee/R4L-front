'use strict';

var tilesDict = {
  opencyclemap: {
    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
    options: {
        attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }
  },
  digital_gobel_map: {
    url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    options: {
      apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
      mapid: 'digitalglobe.n6nhn7mg'
    }
  }
}

var MapController = App.controller('MapCtrl', [ '$scope', '$http', 'leafletData', '$timeout', '$compile',
  function($scope, $http, leafletData, $timeout, $compile){
    angular.extend($scope, {
      center: {
        lng: 124.671876,
        lat: 10.9578115,
        zoom: 14
      },
      tiles: tilesDict.digital_gobel_map
    });

    //get the geojson data from backend API
    $http.get('/assets/libs/polygon_coordinate.json').success(function(data, status){      
      angular.extend($scope, {
        geojson: {
          data: data,
          style: {
            weight: 2,
            opacity: 1,
            color: 'red',
            fillOpacity: 0
          },
          onEachFeature: function(feature, layer) {
            //console.log(layer);
            layer.bindPopup('<status-button></status-button>', {
              feature : feature,
              layer: layer
            });
          }
        }
      });
    }); 

    //compile directive on popup open
    $scope.$on('leafletDirectiveMap.map.popupopen', function(event, leafletEvent){

        // Create the popup view when is opened
        var feature = leafletEvent.leafletEvent.popup.options.feature;
        var style = leafletEvent.leafletEvent.popup.options.layer.options.style;

        var newScope = $scope.$new();
        newScope.feature = feature;
        newScope.style = style;

        // compile actuall html with angular property
        $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
      });
  }]);