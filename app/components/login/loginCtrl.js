app.controller("login", ["$scope", "$location", "user", function ($scope, $location, user) {
    $scope.failedLogin = false;

    $scope.signin = function () {
        $scope.failedLogin = false;
        user.login($scope.email, $scope.pass).then(
            function (activeUser) {
                $location.path("/"); //TODO: switch redirect by role
            },
            function (err) {
                $log.error(err);
                $scope.failedLogin = true;
            }
        );
    }

    $scope.signup = function () {
        $location.path("/account/join");
    }


}]);