app.controller("productCardCtrl", ["$scope", "$log", "$location", "productService", function($scope, $log, $location, productService){
    $scope.buy = function(productId) {
        $location.path("/product/" + productId);
    }
}]);