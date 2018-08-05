app.controller("navbarCtrl", ["$scope", "user", function($scope, user){
    $scope.isAuthenticated = function() {
return user
    }
}]);