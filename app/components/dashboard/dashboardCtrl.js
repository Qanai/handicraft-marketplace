app.controller("dashboard", ["$scope", "$location", "$log", "user", "store", function ($scope, $location, $log, user, store) {
    function init() {
        // Checking if the user is logged in, if not navigating back to home page
        if (!user.isAuthenticated()) {
            $location.path("/");
            return;
        }

        store.getByUser(user.getActiveUserId()).then(
            function (stores) {
                $scope.stores = stores;
            }
        );
    }

    init();
}]);