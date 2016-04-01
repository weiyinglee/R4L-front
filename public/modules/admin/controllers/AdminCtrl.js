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

	AdminFactory.getData(EventFactory.getEventId()).async().then(function(res){
		$scope.data = generateList(res.data.rows);
	});

	function generateList(list) {
		var map = new Map(), result = new Array()

		list.forEach(function (elm) {
            if (map.has(elm.id)) {
            	map.get(elm.id).push({status : elm.status, count : elm.count, id: Number(elm.id)})
            } else {
            	var o = {}
            	var arr = [{status:elm.status, count:elm.count, id: Number(elm.id)}]            	
            	map.set(elm.id, arr)
            }
		})

		var it = map.entries()
		var entry = null, val = null
		while (entry = it.next().value) {
			val = entry[1]
			val.sort(function (a, b) {
				return a.count < b.count
			})
			result.push(val)
		}
	
		console.log(result)

		return result;
	}

	$scope.count = function(data, status){
		var count = 0;
		data.forEach(function(obj){
			if(obj.status == status){
				count = obj.count;
			}
		})
		return count;
	}

}]);