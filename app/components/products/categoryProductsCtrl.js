app.controller("categoryProducts", ["$scope", "$q", "$log", "$location", "$routeParams", "productService", "category", function ($scope, $q, $log, $location, $routeParams, productService, category) {
    function init() {
        var productsPromise = productService.getByCategory($routeParams.categoryId);
        var categoryPromise = category.getById($routeParams.categoryId);

        $q.all([productsPromise, categoryPromise]).then(
            function (response) {
                $scope.products = response[0];
                $scope.category = response[1];
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    $scope.noProducts = function () {
        return !$scope.products || ($scope.products.length == 0)
    }

    $scope.moreCategories = function () {
        $location.path("/categories");
    }

    init();
}]);