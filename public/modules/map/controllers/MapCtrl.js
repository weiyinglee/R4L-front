'use strict';

var MapController = App.controller('MapCtrl', [ '$scope', '$http', 'leafletData', '$compile',
  function($scope, $http, leafletData, $compile){
    angular.extend($scope, {
      center: {
        lng: 124.671876,
        lat: 10.9578115,
        zoom: 14
      }
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
            layer.bindPopup('<popup></popup>', {
              // im passing feature just in case you want to use it in the directive
              feature : feature
            });
          }
        }
      });
    }); 

    //compile directive on popup open
    $scope.$on('leafletDirectiveMap.map.popupopen', function(event, leafletEvent){

      console.log(leafletEvent)
        // Create the popup view when is opened
        var feature = leafletEvent.leafletEvent.popup.options.feature;

        var newScope = $scope.$new();
        newScope.feature = feature;

        console.log(feature);
        // compile actuall html with angular property
        // console.log _contentNode Eric so you know why we compile this one, we passing directive a newScope
        // then you have new scope in ur directive with the feature you included here
        $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
      });
  }]);
