'use strict';

//status btn
App.directive('statusButton', function($timeout){
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/statusBtn.html",
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {

      //to create te different image src
      function imgSrc(statusImg) {
        var imgPath = '/assets/img/';
        var extension = '.png';
        return imgPath + statusImg + extension;
      }

      var damageSrc = imgSrc('damage');
      var fineSrc = imgSrc('fine');
      var unknownSrc = imgSrc('unknown');
      var nextSrc = imgSrc('next');

      scope.damageImg = damageSrc;
      scope.fineImg = fineSrc;
      scope.unknownImg = unknownSrc;
      scope.nextImg = nextSrc;

      scope.rest = false; //for set timeout to make button pause a little after clicked

      scope.changeColor = function(status){
        scope.rest = true;
        switch(status){
          case 'damage':
            scope.layer.setStyle({
              color: null,
              fillColor: 'red',
              fillOpacity: 1.0,
              Opacity: 0.0
            });
            console.log('damage save to DataBase!');
            break;
          case 'fine':
            scope.layer.setStyle({
                color: null,
                fillColor: 'blue',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
              console.log('fine save to DataBase!');
            break;
          case 'unknown':
            scope.layer.setStyle({
                color: null,
                fillColor: 'purple',
                fillOpacity: 1.0,
                Opacity: 0.0
              });
              console.log('unknown save to DataBase!');
            break;
          case 'next':
            alert('You completed the map!');
            break;
        }
        //After click, wait for three seconds to be function again
        $timeout(function(){
          scope.rest = false;
        }, 3000);
      };

      scope.clicked = function(status){
        switch(status){
          case 'damage':
            scope.damageImg = imgSrc('damage_click');
            break;
          case 'fine':
            scope.fineImg = imgSrc('fine_click');
            break;
          case 'unknown':
            scope.unknownImg = imgSrc('unknown_click');
            break;
          case 'next':
            scope.nextImg = imgSrc('next_click');
            break;
        }
      };
      scope.unclicked = function(status){
        switch(status){
          case 'damage':
            scope.damageImg = damageSrc;
            break;
          case 'fine':
            scope.fineImg = fineSrc;
            break;
          case 'unknown':
            scope.unknownImg = unknownSrc;
            break;
          case 'next':
            scope.nextImg = nextSrc;
            break;
        }
      };
      scope.hovered = function(status){
        switch(status){
           case 'damage':
            scope.damageImg = imgSrc('damage_hover');
            break;
          case 'fine':
            scope.fineImg = imgSrc('fine_hover');
            break;
          case 'unknown':
            scope.unknownImg = imgSrc('unknown_hover');
            break;
          case 'next':
            scope.nextImg = imgSrc('next_hover');
            break;
        }
      };
      scope.unhovered = function(status){
        switch(status){
          case 'damage':
            scope.damageImg = damageSrc;
            break;
          case 'fine':
            scope.fineImg = fineSrc;
            break;
          case 'unknown':
            scope.unknownImg = unknownSrc;
            break;
          case 'next':
            scope.nextImg = nextSrc;
            break;
        }
      };
    }
  }
});