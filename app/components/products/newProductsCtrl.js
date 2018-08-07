app.controller("newProducts", ["$scope", "$location", "$log", "productService", function ($scope, $location, $log, productService) {
    $scope.init = function (limit) {
        productService.getNew(limit).then(
            function (prods) {
                $scope.products = prods;
            },
            function (err) {
                $log.error(err);
            }
        );
    }
}]);