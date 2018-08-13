app.controller("checkout", ["$scope", "$location", "$log", "user", "cartSrv", function ($scope, $location, $log, user, cartSrv) {
    function init() {
        // Checking if the user is logged in, if not navigating back to home page
        if (!user.isAuthenticated()) {
            $location.path("/");
            return;
        }

        cartSrv.assignUser(user.getActiveUserId());

        $scope.products = cartSrv.getAllProducts();
    }

    $scope.pay = function () {
        cartSrv.checkOut().then(
            function () {
                cartSrv.empty();
                $location.path("/");
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    init();
}]);