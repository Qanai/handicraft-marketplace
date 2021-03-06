app.controller("productDetails", ["$scope", "$location", "$log", "$routeParams", "productService", "cartSrv", function ($scope, $location, $log, $routeParams, productService, cartSrv) {
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

    $scope.addCart = function () {
        // $log.log($scope.product);
        var data = {
            product: $scope.product,
            quantity: 1
        };
        cartSrv.addProduct(data);
        $location.path("/cart");
    }

    $scope.rate = function () {
        var data = {
            id: $scope.product.id,
            rating: $scope.product.rating + 1
        }

        productService.update(data).then(
            function (prod) {
                init();
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    init();
}]);