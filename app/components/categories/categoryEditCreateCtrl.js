app.controller("categoryEditCreate", ["$scope", "$location", "$log", "$routeParams", "category", "store", "user", function($scope, $location, $log, $routeParams, category, store, user){
    // Checking if the user is logged in, if not navigating back to home page
    if (!user.isAuthenticated() || !user.isAuthorized("Admin")) {
        $location.path("/");
        return;
    }

    $scope.editedCategory = null;
}]);