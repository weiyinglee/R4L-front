'use strict';

var MapController = App.controller('MapCtrl', [ '$scope', '$http', 'leafletData' ,
  function($scope, $http, leafletData){
    angular.extend($scope, {
      center: {
        lng: 124.671876,
        lat: 10.9578115,
        zoom: 14
      }
    });

    //get the geojson data from backend API
    $http.get('/assets/libs/polygon_coordinate.json').success(function(data, status){
      
      //status buttons (will be put in the pop up)
      var damageBtn = '<status-button id="damage"></status-button>';
      var fineBtn = '<status-button id="fine"></status-button>';
      var unknownBtn = '<status-button id="unknown"></status-button>';
      var nextBtn = '<status-button id="next"></status-button>';
      
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
            layer.bindPopup(damageBtn);
          }
        }
      });

    }); 

  }]);