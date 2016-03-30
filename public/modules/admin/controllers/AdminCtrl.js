'use strict';

var AdminController = App.controller('AdminCtrl', ["$scope", "UploadFactory", "$mdDialog", 
  function($scope, UploadFactory, $mdDialog){
	
  	$scope.fieldIncompleted = false;

	$scope.cancel = function() {
		$mdDialog.cancel();
	}

	$scope.upload = function(name, description, file, image) {
		if(name === undefined || description === undefined){
			$scope.fieldIncompleted = true;
			return;
		}
		UploadFactory.fileUpload(name, description, file, image);
	}

}]);