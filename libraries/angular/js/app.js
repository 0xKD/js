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

// first arg is name of module, second is dependencies
var app = angular.module('app', []);

// declaring a controller
// 
// first arg is name of controller, 
//  second arg is array whose last arg is function, rest of the args are 
//  dependencies to the controller function passed to it as arguments,
//  order of dependencies must match order of arguments to function.
app.controller('MyController', ['$scope', function($scope) {
  // add variables / functions to $scope
  $scope.val = "King's Landing";
  $scope.add = function() {
    return 3 + 3;
  };
}]);
