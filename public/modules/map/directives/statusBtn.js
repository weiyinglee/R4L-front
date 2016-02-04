'use strict';

//status btn
App.directive('statusButton', function(){
  return {
    restrict: 'E',
    template: '<button><img src="#"/></button>',
    compile: function(element, attrs){
      return {
        pre: function(scope, element, attrs){
        },
        post: function(scope, element, attrs){
          
          var attrID = attrs.id;
          var attr = $('#' + attrID);
          var attrImg = $('#' + attrID + ' img');
          var srcPath = '/assets/img/' + attrID;
          
          //the default look
          attrImg.attr('src', srcPath + '.png');
          //onclikc look
          attr.click(function(){
            attrImg.attr('src', srcPath + '_click.png');
          });
          //hover look
          attr.hover(function(){
            attrImg.attr('src', srcPath + '_hover.png');
          }, function(){
            attrImg.attr('src', srcPath + '.png');
          });
        
        }
      }
    },
    controller: 'MapCtrl'
  }
});