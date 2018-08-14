app.controller("login", ["$scope", "$location", "$routeParams", "$log", "user", function ($scope, $location, $routeParams, $log, user) {
    $scope.failedLogin = false;

    $scope.signin = function () {
        $scope.failedLogin = false;
        user.login($scope.email, $scope.pass).then(
            function (activeUser) {
                switch (activeUser.role.name) {
                    case "Seller":
                        $location.path("/dashboard");
                        break;
                    case "Buyer":
                        if ($routeParams.ref == "buy") {
                            $location.path("/checkout");
                        } else {
                            $location.path("/");
                        }
                        break;
                    default:
                        $location.path("/");
                        break;
                }
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