(function () {
  var app = angular.module('app', []);
  
  app.controller('index', ['$scope', function($scope) {
    $scope.helloWorld = "";
  }]);
})();
