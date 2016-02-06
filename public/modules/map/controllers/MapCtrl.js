'use strict';

var MapController = App.controller('MapCtrl', [ '$scope', '$http', '$compile' ,'leafletData' ,
  function($scope, $http, $compile, leafletData){
    
     var tilesDict = {
      opencyclemap: {
        url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        options: {
            attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
        }
      },
      mapbox_wheat: {
        name: 'Mapbox Wheat Paste',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
            mapid: 'bufanuvols.lia35jfp'
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
            var html = '<div><damage-button></damage-button><fine-button></fine-button><unknown-button></unknown-button><next-button></next-button></div>';
            var btns = $compile(html)($scope);
            layer.bindPopup(btns[0]);
          }
        }
      });
    }); 
  }]);