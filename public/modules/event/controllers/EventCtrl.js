'use strict';

var EventController = App.controller('EventCtrl', [
	'$scope',
	'$http',
	'$location',
	'EventFactory',
	'PolygonFactory',
	'UserFactory',
	function($scope, $http, $location, EventFactory, PolygonFactory, UserFactory){

  	  $scope.showEarthquakeTxt = false;
  	  $scope.showFloodTxt = false;
      $scope.showHurricaneTxt = false;

  	  $scope.earthquakeToggle = function(){
  		$scope.showEarthquakeTxt = !$scope.showEarthquakeTxt;
  	  }

	  $scope.floodToggle = function(){
	  	$scope.showFloodTxt = !$scope.showFloodTxt;
	  }

	  $scope.hurricaneToggle = function(){
	  	$scope.showHurricaneTxt = !$scope.showHurricaneTxt;
	  }

	  $scope.enterMap = function(eventId){
	  	EventFactory.setEventId(eventId);
	  	$location.path('/map');
	  }

	  $scope.signOut = function(){
	  	UserFactory.signout();
	  	$location.path('/');
	  }

}]);