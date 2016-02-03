'use strict';

//status btn
App.directive('statusButton', function(){
  
  //determine different status button look
  function btnLook(attrID) {
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

  return {
    restrict: 'E',
    template: '<button><img src="#"/></button>',
    link: function(scope, element, attrs){
      //determine what kind of status button
      btnLook(attrs.id);
    }
  }
});