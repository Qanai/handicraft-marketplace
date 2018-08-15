app.controller("productCardCtrl", ["$scope", "$log", "$location", "productService", function ($scope, $log, $location, productService) {
    $scope.buy = function (productId) {
        $location.path("/product/" + productId);
    }

    $scope.edit = function (productId, ev) {
        ev.stopPropagation();

        $location.path("/product/edit/" + productId);
    }

    $scope.deleteProduct = function (product, ev) {
        ev.stopPropagation();

        productService.deleteProduct(product).then(
            function (response) {

            },
            function (err) {
                $log.error(err);
            }
        );
    }
}]);