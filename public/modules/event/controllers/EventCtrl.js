'use strict';

var EventController = App.controller('EventCtrl', [
	'$scope',
	'$http',
	'$location',
	'$mdDialog',
	'EventFactory',
	'PolygonFactory',
	'UserFactory',
	function($scope, $http, $location, $mdDialog, EventFactory, PolygonFactory, UserFactory){

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

}]);