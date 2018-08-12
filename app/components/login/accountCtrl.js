app.controller("account", ["$scope", "$location", "$routeParams", "$log", "user", "role", function ($scope, $location, $routeParams, $log, user, role) {
    function init() {

        // $log.log($routeParams);

        $scope.user = user.getActiveUser();
        $scope.userRole = $scope.user ? $scope.user.role : null;

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
                } else {
                    for (const key in $scope.user) {
                        if ($scope.user.hasOwnProperty(key)) {
                            $scope[key] = $scope.user[key];
                        }
                    }
                }
            },
            function (err) {
                $log.error(err);
            }
        );
    }

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
            password: $scope.password,
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

    $scope.editAccount = function () {
        $scope.user.name = $scope.name;
        $scope.user.email = $scope.email;
        $scope.user.password = $scope.password;

        user.update($scope.user).then(
            function (updatedUser) {
                user.logout();
                $location.path("/login");
            }
        );
    }

    $scope.showDashboard = function () {
        $location.path("/dashboard");
    }

    init();
}]);