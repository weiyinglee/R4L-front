var App = window.App = angular.module('R4LApp', [
		'ngRoute',
		'leaflet-directive',
		'ui.bootstrap',
		'ngMaterial',
		'ngAnimate',
		'ngResource'
	]
);

// turn off leaflet login
App.config(function($logProvider){
  	$logProvider.debugEnabled(false);
});

// url routing
App.config(["$routeProvider", function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl : "/modules/user/views/Login.html",
			controller  : "LoginCtrl"
		}).
		when('/signup', {
			templateUrl : "/modules/user/views/Register.html",
			controller  : "RegisterCtrl"
		}).
		when('/events', {
			templateUrl : "/modules/event/views/Events.html",
			controller  : "EventCtrl" 
		}).
		when('/map', {
			templateUrl : "/modules/map/views/Map.html",
			controller  : "MapCtrl"
		})
	}
]);

// Fix strip trailing slashes for ngResource
App.config(["$resourceProvider", function($resourceProvider){
	$resourceProvider.defaults.stripTrailingSlashes = false;
}]);