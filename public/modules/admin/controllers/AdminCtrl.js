'use strict';

var AdminController = App.controller('AdminCtrl', ["$scope", "AdminFactory", "EventFactory", "$mdDialog", 
  function($scope, AdminFactory, EventFactory, $mdDialog){
	
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

	$scope.data = function(){
		AdminFactory.getData(EventFactory.getEventId());
	}

}]);