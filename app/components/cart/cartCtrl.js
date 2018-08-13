app.controller("cartCtrl", ["$scope", "$location", "$log", "cartSrv", "user", function ($scope, $location, $log, cartSrv, user) {
    
    function init() {
        cartSrv.getAllProducts().then(
            function (prods) {
                $scope.products = prods;
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    $scope.calculateProductPrice = function(product){
        return product.price * product.quantity;
    }

    init();
}]);