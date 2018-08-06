app.controller("navbarCtrl", ["$scope", "$location", "user", function ($scope, $location, user) {
    $scope.isAuthenticated = function () {
        return user.isAuthenticated();
    }

    $scope.isAuthorized = function (role) {
        return user.isAuthorized(role);
    }

    $scope.userName = function(){
        return user.getActiveUserName();
    }

    $scope.accountUrl = function(){
        return "account/" + user.getActiveUserId();
    }

    $scope.logout = function(){
        user.logout();
        $location.path("/");
    }
}]);