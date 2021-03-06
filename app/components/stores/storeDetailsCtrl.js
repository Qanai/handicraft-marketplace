app.controller("storeDetails", ["$scope", "$location", "$log", "$routeParams", "store", "productService", function ($scope, $location, $log, $routeParams, store, productService) {
    function init() {
        var storesPromise = store.getById($routeParams.storeId);
        // var categoriesPromise = 


        store.getById($routeParams.storeId).then(
            function (response) {
                $scope.store = response;
                return productService.getByStore(response.id);
            },
            function (err) {
                $log.error(err);
            }
        ).then(
            function (products) {
                $scope.store.products = products;
            },
            function (err) {
                $log.error(err);
            }
        );
    }
    
    $scope.moreCategories = function () {
        $location.path("/categories");
    }

    init();
}]);