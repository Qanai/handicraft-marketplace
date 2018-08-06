app.controller("account", ["$scope", "$location", "$routeParams", "$log", "user", "role", function ($scope, $location, $routeParams, $log, user, role) {

    $log.log($routeParams);

    $scope.userRole = user.getActiveUserRole();

    role.getAll().then(
        function (roles) {
            $scope.roles = roles;
            if ($scope.userRole == null) {
                switch ($routeParams.spec) {
                    case "join":
                        $scope.userRole = getRole("Buyer");
                        break;
                    case "sell":
                        $scope.userRole = getRole("Seller");
                        break;
                    default:
                        $scope.userRole = getRole("Surfer");
                        break;
                }
            }
        },
        function (err) {
            $log.error(err);
        }
    );

    function getRole(name) {
        for (var i = 0; i < $scope.roles.length; i++) {
            if ($scope.roles[i].name.toLowerCase() == name.toLowerCase()) {
                return $scope.roles[i];
            }
        }

        return null;
    }

    $scope.createAccount = function () {
        var data = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.pass,
            roleId: $scope.userRole ? $scope.userRole.id : -1
        }

        user.add(data).then(
            function (response) {
                $location.path("/login");
            },
            function (err) {
                $log.error(err);
            }
        );
    }
}]);