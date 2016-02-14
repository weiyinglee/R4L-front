App.directive('popup', ['$http', '$templateCache', function ($http, $templateCache) {
  return {
    restrict: 'AEC',
    templateUrl : "/modules/map/views/popup.html",
    link : function($scope, elm, attr){
      $scope.clickME = function(){
        alert("hello Eric" + "this is feature being click" + JSON.stringify($scope.feature));
      }
    }
  };
}]);
