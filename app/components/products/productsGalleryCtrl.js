app.controller("productsGallery", ["$scope", "$log", "$routeParams", "productService", function ($scope, $log, $routeParams, productService) {
    productService.getByCategory($routeParams.categoryId).then(
        function (response) {
            $scope.products = response;
        },
        function (err) {
            $log.error(err);
        });
}]);