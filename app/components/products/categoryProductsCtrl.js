app.controller("categoryProducts", ["$scope", "$log", "$location", "$routeParams", "productService", function ($scope, $log, $location, $routeParams, productService) {
    productService.getByCategory($routeParams.categoryId).then(
        function (response) {
            $scope.products = response;
        },
        function (err) {
            $log.error(err);
        }
    );

    $scope.canDisplay = function() {
        return !$scope.products || ($scope.products.length == 0)
    }

    $scope.moreCategories = function(){
        $location.path("/categories");
    }
}]);