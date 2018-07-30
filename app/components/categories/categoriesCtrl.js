app.controller("categoryGallery", ["$scope", "$location", "$log", "category", function ($scope, $location, $log, category) {

    category.getAll().then(
        function (categories) {
            $scope.categories = categories;
        },
        function (err) {
            $log.error(err);
        }
    );
}]);