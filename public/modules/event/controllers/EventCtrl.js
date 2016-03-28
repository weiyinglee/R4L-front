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

	  var events = EventFactory.getEvent();

	  $scope.eventList = events.data;

	  $scope.isAdmin = UserFactory.getUserData().data.is_admin;

	  $scope.pageCount = 1;

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