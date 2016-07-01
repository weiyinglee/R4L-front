var App = window.App = angular.module('R4LApp', [
		'ngRoute',
		'leaflet-directive',
		'ui.bootstrap',
		'ngMaterial',
		'ngAnimate',
		'ngResource',
		'ngCookies',
		'ngFileUpload'
	]
);


// Set base URL 
App.value("baseUrl", (function getBaseUrl(){
	var baseUrl = "http://" + window.location.hostname
	return baseUrl
})())

// turn off leaflet login
App.config(function($logProvider){
  	$logProvider.debugEnabled(false);
});

// url routing
App.config(["$routeProvider", function($routeProvider){

	var checkLoggedIn = function($location, $cookieStore){
		var userData = $cookieStore.get('userData');
		if(userData === undefined || !userData.data.success){
		  $location.path('/');
		}
	}

	var notLoggedIn = function($location, $cookieStore){
		var userData = $cookieStore.get('userData');
		if(userData != undefined && userData.data.success){
		  $location.path('/events');
		}
	}

	var isAdmin = function($location, $cookieStore){
		var userData = $cookieStore.get('userData');
		if(userData === undefined || !userData.data.success){
		  $location.path('/');
		}else if(!userData.data.is_admin){
		  $location.path('/events');
		}
	}

	$routeProvider.
		when('/', {
			resolve: {
				check: notLoggedIn
			},
			templateUrl : "/modules/user/views/Login.html",
			controller  : "LoginCtrl"
		}).
		when('/mod', {
			resolve : {
				"check" : notLoggedIn
			},
			"templateUrl" : "modules/user/views/Login_modified.html",
			"controller" : "LoginCtrlMod"
		}).
		when('/signup', {
			resolve: {
				check: notLoggedIn
			},
			templateUrl : "/modules/user/views/Register.html",
			controller  : "RegisterCtrl"
		}).
		when('/events', {
			resolve: {
				check: checkLoggedIn
			},
			templateUrl : "/modules/event/views/Events.html",
			controller  : "EventCtrl"
		}).
		when('/map', {
			resolve: {
				check: checkLoggedIn
			},
			templateUrl : "/modules/map/views/Map.html",
			controller  : "MapCtrl"
		}).
		when('/admin', {
			resolve: {
				check: isAdmin
			},
			templateUrl: "/modules/admin/views/admin.html",
			controller : "AdminCtrl"
		}).
		otherwise('/')
	}
]);
