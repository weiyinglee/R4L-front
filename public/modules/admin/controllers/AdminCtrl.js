'use strict';

var AdminController = App.controller('AdminCtrl', ["$scope", "AdminFactory", "EventFactory", "UserFactory", "$mdDialog", "$location",
  function($scope, AdminFactory, EventFactory, UserFactory, $mdDialog, $location){
	
  	$scope.fieldIncompleted = false;

	$scope.cancel = function() {
		$mdDialog.cancel();
	}

	$scope.upload = function(name, description, file, image) {
		if(name === undefined || description === undefined){
			$scope.fieldIncompleted = true;
			return;
		}
		AdminFactory.fileUpload(name, description, file, image);
	}

	AdminFactory.getData(EventFactory.getEventId()).async().then(function(res){
		$scope.data = res.data.result;
	});

	$scope.signout = function(){
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