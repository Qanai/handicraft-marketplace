app.controller("newProducts", ["$scope", "$location", "$log", "productService", function ($scope, $location, $log, productService) {
    productService.getNew().then(
        function (prods) {
            $scope.products = prods;
        },
        function (err) {
            $log.error(err);

        }
    );
}]);