'use strict';

var MapController = App.controller('MapCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'leafletData',
    '$compile',
    '$cookieStore',
    '$mdDialog',
    'BadgeFactory',
    'EventFactory',
    'PolygonFactory',
    'UserFactory',
  function(
    $scope,
    $rootScope,
    $location,
    leafletData,
    $compile,
    $cookieStore,
    $mdDialog,
    BadgeFactory,
    EventFactory,
    PolygonFactory,
    UserFactory
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
      defaults: {
        controls: {
          layers: {
            visible: true,
            position: "topright",
            collapsed: false
          }
        }
      },
      layercontrol: {
        icons: {
          uncheck: "fa fa-toggle-off",
          check: "fa fa-toggle-on"
        }
      },
      layers: {
        baselayers: {
          oms: {
            name: "Base Map",
            type: "xyz",
            url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            layerOptions: {
              apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
              mapid: 'digitalglobe.n6nhn7mg',
              minZoom: 2
            }
          },
          cycle: {
            name: "Satellite Images",
            type: "xyz",
            url: 'https://{s}.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            layerOptions: {
              apikey: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpa2EwN3N6cTBnb2l2b200MnYybnl6cXEifQ.qRrepvdS2GT_Vs9Kh9HzBg',
              mapid: 'digitalglobe.nmgi4k9c',
              minZoom: 2
            }
          }

        },
        overlays: {
          after: {
            name: "After disaster",
            type: "xyz",
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
          }
        }
      },
      controls: {
        scale: true
      },
      marker: {
        newMarker: {
          lng: 124.740348,
          lat: 11.379895,
          opacity: 0.0
        }
      }
    });

    var layerMap = {}
    var bounds = {}

    $scope.signOut = function(){
      var confirm = $mdDialog.confirm()
        .title('Sign out already ?')
        .textContent('Are you sure to log out ?')
        .ok('YES')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function() {
          UserFactory.signout(); 
          $location.path('/');
      });
    }

    $scope.menu = function() {
      //make the badge numbers back to original
      BadgeFactory.resetBadges();
      //redirect to menu
      $location.path('/events');
    }

    $scope.eventId = EventFactory.getEventId();
    
    $scope.username = UserFactory.getUserData().config.data.username;

    var path = 'http://52.8.54.187:3000/user/' + $scope.username + '/event/' + $scope.eventId;

    leafletData.getMap('map').then(function(map){
        map.on('dragend', function(event){
          console.log(map.getBounds());
          bounds = map.getBounds();
          //get the geojson data from backend API
          PolygonFactory.getGeojson(path, bounds, $scope.username).async().then(function(data){

            var marker = null;
            var popup = L.popup().setContent('<status-button></status-button>');

            leafletData.getMarkers().then(function(leafletMarkers){
              marker = leafletMarkers.newMarker;
              marker.bindPopup(popup);
            });

            data.data.features.forEach(function(data){
              if(data.geometry){
                data.geometry = JSON.parse(data.geometry);

              }
              if(data.geometry_multi){
                data.geometry_multi = JSON.parse(data.geometry_multi);
              }
              data.type = "Feature";
            });

            if(true){

              angular.extend($scope, {
                geojson: {
                  type: "MultiPolygon",
                  data: data.data,
                  style: {
                    weight: 3,
                    opacity: 1,
                    color: 'darkred',
                    fillColor: null,
                    fillOpacity: 0
                  },
                  markers : {
                    cursor : {
                      lat : 0,
                      lng : 0
                    }
                  },
                  onEachFeature: function(feature, layer) {
                    layerMap[feature.id] = layer;

                    //obtain the saved color
                    switch(feature.properties.status){
                      case 'DAMAGE':
                        layer.setStyle({
                          fillColor: 'RED', 
                          fillOpacity: 1.0
                        });
                        BadgeFactory.incDamage();
                        break;
                      case 'NO_DAMAGE':
                        layer.setStyle({
                          fillColor: 'BLUE', 
                          fillOpacity: 1.0
                        });
                        BadgeFactory.incUnDamage();
                        break;
                      case 'UNSURE':
                        layer.setStyle({
                          fillColor: 'PURPLE', 
                          fillOpacity: 1.0
                        });
                        BadgeFactory.incUnKnown();
                        break;
                    }

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

                      if(feature.properties.status != 'NOT_EVALUATED'){

                        handleCurrentStatus(layer, 'status');

                        layer.setStyle({
                          fillColor: null,
                          fillOpacity: 0
                        });

                        //save the data
                        var path = 'http://52.8.54.187:3000/event/' + $scope.eventId + '/polygon/' + feature.id;
                        var data = {
                          username: $scope.username,
                          status: 'NOT_EVALUATED'
                        }
                        PolygonFactory.savePolygon(path, data);
                      }
                    });
                  }
                } 
              });
            }
          });
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

      var featureId = $scope.marker.newMarker.layer_featureId;
      var status    = object.status;

      //var nextId = featureId + 1;
      var fillColor = object.color;

      var layer = layerMap[featureId];
      var changeColor = null;

      function findNextLayer() {
        var nextLayer;
        var nextId = featureId + 1;
        var found = false;

        //if there is no polygon left
        if(BadgeFactory.getTotal() == 0){
          return -1;
        }
        while(!found){
          nextLayer = layerMap[nextId];
          //if the next layer is not exist
          if(!nextLayer){
            nextId = 0;
            continue;
          }

          if(nextLayer.options.fillColor){
            nextId++;
          }else{
            found = true;
          }
        }
        return nextLayer;
      }

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
          var nextLayer = findNextLayer();
          var nextPolygon, currentPolygon;

          if(nextLayer == layerMap[0]){
            nextPolygon = new L.LatLng(11.379895, 124.740348);
            currentPolygon = new L.LatLng(11.379895, 124.740348);
          }else if(nextLayer == -1){
            alert("You completed the map!");
            return;
          }else{  
            nextPolygon = new L.LatLng(
              nextLayer.feature.properties.centroid.lat,
              nextLayer.feature.properties.centroid.lng);

            currentPolygon = new L.LatLng(
              layer.feature.properties.centroid.lat,
              layer.feature.properties.centroid.lng);
          }

          //check if the polygon is too far by 300 meters to improve use visibility
          leafletData.getMap('map').then(function(map){
            map.closePopup();
            nextLayer.fire('click', { latlng: nextPolygon });
            if(currentPolygon.distanceTo(nextPolygon) > 300){
              map.setView(nextPolygon, 19);
            }
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

    $rootScope.$on('event_update', function(){
      $scope.eventId = EventFactory.getEventId();
    });

    $rootScope.$on('featureStatusChange', function(event, data){
      $scope.handlerclick(data);
    });

  }]);
