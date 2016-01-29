'use strict';

angular.module('mapApp')
  .controller('mapCtr', [ '$scope', '$http', 'leafletData' , function($scope, $http, leafletData){
  	angular.extend($scope, {
  	  center: {
  	  	lat: 11.1046175,
  	  	lng: 124.890626,
  	  	zoom: 10
  	  }
  	});

    //get the polygon coordinates from a JSON
    $http.get('/assets/libs/polygon_coordinate.json').success(function(data, status){
      angular.extend($scope, {
        geojson: {
          data: data,
          style: {
            weight: 2,
            opacity: 1,
            color: 'red',
            fillOpacity: 0
          }
        }
      });
    });
    
  }]);
