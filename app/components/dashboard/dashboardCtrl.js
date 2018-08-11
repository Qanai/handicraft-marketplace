app.controller("dashboard", ["$scope", "$location", "$log", "user", "store", "category", function ($scope, $location, $log, user, store, category) {
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

        category.getAll().then(
            function (results) {
                $scope.categories = results;
            }
        );
    }

    $scope.isAuthenticated = function () {
        return user.isAuthenticated();
    }

    $scope.isAuthorized = function (role) {
        return user.isAuthorized(role);
    }

    init();
}]);