var App = window.App = angular.module('R4LApp', [
		'ngRoute',
		'leaflet-directive',
		'ui.bootstrap'
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
		when('/map', {
			templateUrl : "/modules/map/views/Map.html",
			controller  : "MapCtrl"
		})
	}
]);