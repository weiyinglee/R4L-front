'use strict';

//damage btn
App.directive('damageButton', function(){
  return {
    restrict: 'E',
    template: '<button><img src="/assets/img/damage.png"/></button>',
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {
      var attrImg = $('damage-button img');
      var srcPath = '/assets/img/damage';
      
      //onclick look
      element.click(function(){
        attrImg.attr('src', srcPath + '_click.png');
      });
      //hover look
      element.hover(function(){
        attrImg.attr('src', srcPath + '_hover.png');
      }, function(){
        attrImg.attr('src', srcPath + '.png');
      });
    }
  }
});

//fine btn
App.directive('fineButton', function(){
  return {
    restrict: 'E',
    template: '<button><img src="/assets/img/fine.png"/></button>',
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {
      var attrImg = $('fine-button img');
      var srcPath = '/assets/img/fine';
      
      //onclick look
      element.click(function(){
        attrImg.attr('src', srcPath + '_click.png');
      });
      //hover look
      element.hover(function(){
        attrImg.attr('src', srcPath + '_hover.png');
      }, function(){
        attrImg.attr('src', srcPath + '.png');
      });
    }
  }
});

//unknown btn
App.directive('unknownButton', function(){
  return {
    restrict: 'E',
    template: '<button><img src="/assets/img/unknown.png"/></button>',
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {
      var attrImg = $('unknown-button img');
      var srcPath = '/assets/img/unknown';
      
      //onclick look
      element.click(function(){
        attrImg.attr('src', srcPath + '_click.png');
      });
      //hover look
      element.hover(function(){
        attrImg.attr('src', srcPath + '_hover.png');
      }, function(){
        attrImg.attr('src', srcPath + '.png');
      });
    }
  }
});

//next btn
App.directive('nextButton', function(){
  return {
    restrict: 'E',
    template: '<button><img src="/assets/img/next.png"/></button>',
    controller: 'MapCtrl',
    link: function(scope, element, attrs) {
      var attrImg = $('next-button img');
      var srcPath = '/assets/img/next';
      
      //onclick look
      element.click(function(){
        attrImg.attr('src', srcPath + '_click.png');
      });
      //hover look
      element.hover(function(){
        attrImg.attr('src', srcPath + '_hover.png');
      }, function(){
        attrImg.attr('src', srcPath + '.png');
      });
    }
  }
});