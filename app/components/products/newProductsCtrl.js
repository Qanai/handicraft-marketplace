app.controller("newProducts", ["$scope", "$location", "$log", "productService", function ($scope, $location, $log, productService) {
    productService.getNew(10).then(
        function (prods) {
            $scope.products = prods;
        },
        function (err) {
            $log.error(err);
        }
    );
}]);