app.controller("productDetails", ["$scope", "$location", "$log", "$routeParams", "productService", function ($scope, $location, $log, $routeParams, productService) {
    $scope.product = null;

    function init() {
        productService.getById($routeParams.productId).then(
            function (prod) {
                $scope.product = prod;
            },
            function (err) {
                $log.error(err);
                $scope.product = null;
            }
        );
    }

    init();
}]);