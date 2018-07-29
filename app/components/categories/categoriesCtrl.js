app.controller("countryGallery", ["$scope", "$location", "$log", "category", function ($scope, $location, $log, category) {
    $scope.getAll = function () {
        category.getAll().then(
            function (categories) {
                $scope.categories = categories;
            },
            function (err) {
                $log.error(err);
            }
        );
    }
}]);