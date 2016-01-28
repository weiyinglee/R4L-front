'use strict';

angular.module('mapApp')
  .controller('mapCtr', [ '$scope' , function($scope){
  	angular.extend($scope, {
  	  london: {
  	  	lat: 51.505,
  	  	lng: -0.09,
  	  	zoom: 13
  	  }
  	});
  }]);
