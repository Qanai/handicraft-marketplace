app.controller("categoryProducts", ["$scope", "$q", "$log", "$location", "$routeParams", "$filter", "productService", "category", "sortService", function ($scope, $q, $log, $location, $routeParams, $filter, productService, category, sortService) {
    function init() {
        var productsPromise = productService.getByCategory($routeParams.categoryId);
        var categoryPromise = category.getById($routeParams.categoryId);
        var sortPromise = sortService.getProductCardSortOptions();

        $q.all([productsPromise, categoryPromise, sortPromise]).then(
            function (response) {
                $scope.products = response[0];
                $scope.category = response[1];
                $scope.sortOptions = response[2];
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

    $scope.filterProd = function (prod) {
        return !$scope.fquery ||
            prod.name.toLowerCase().indexOf($scope.fquery.toLowerCase()) != -1 ||
            prod.description.toLowerCase().indexOf($scope.fquery.toLowerCase()) != -1;
    }

    init();
}]);