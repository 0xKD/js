/*
// dependencies in second parameter
angular.module('app', []);

var MyController = function($scope) {
	// values
	$scope.val = "King's Landing";

	// functions
	$scope.add = function() {
		return 3 + 3;
	}
}
*/

// do not pollute global scope with functions, do this instead

var app = angular.module('app', []);

app.controller('MyController', function($scope) {
	$scope.val = "King's Landing";
	$scope.add = function() {
		return 3 + 3;
	}
});