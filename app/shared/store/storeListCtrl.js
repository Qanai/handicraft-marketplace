app.controller("storeListCtrl", ["$scope", "$log", "$routeParams", "store", function ($scope, $log, $routeParams, store) {
    function init() {
        store.getByCategory($routeParams.categoryId).then(
            function (resutls) {
                $scope.stores = resutls;
            }
        );
    }

    init();
}]);