app.controller("cartCtrl", ["$scope", "$location", "$log", "cartSrv", "user", function ($scope, $location, $log, cartSrv, user) {

    function init() {
        $scope.products = cartSrv.getAllProducts();
    }

    $scope.calculateProductPrice = function (prod) {
        return cartSrv.getProductPrice(prod);
    }

    $scope.totalItems = function () {
        return cartSrv.getTotalItems();
    }

    $scope.totalPrice = function () {
        return cartSrv.cartPrice();
    }

    $scope.emptyCart = function() {
        cartSrv.empty();
    }

    $scope.removeProduct = function(prod) {
        cartSrv.removeProduct(prod);
    }

    init();
}]);