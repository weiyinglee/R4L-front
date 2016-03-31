'use strict';

var EventController = App.controller('EventCtrl', [
	'$scope',
	'$rootScope',
	'$location',
	'$mdDialog',
	'EventFactory',
	'PolygonFactory',
	'UserFactory',
	function($scope, $rootScope, $location, $mdDialog, EventFactory, PolygonFactory, UserFactory){

	  EventFactory.getEvent('http://52.8.54.187:3000/event').async().then(function(events){
	  	$scope.events = events;
	  	console.log($scope.events);
	  });

	  $scope.isAdmin = UserFactory.getUserData().data.is_admin;

	  $scope.pageCount = 1;

	  $scope.enterMap = function(eventId, eventCount){
	  	EventFactory.setEventId(eventId);
	  	EventFactory.setEventCount(eventCount);
	  	$location.path('/map');
	  }

	  $scope.showCreatePanel = function() {
	  	$mdDialog.show({
	  		controller: 'AdminCtrl',
	  		templateUrl: '/modules/admin/views/upload.html',
	  		parent: angular.element(document.body),
	  		clickOutsideToClose: true
	  	})
	  	.then(function(){
	  		console.log('Successfully create a event');
	  	});
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