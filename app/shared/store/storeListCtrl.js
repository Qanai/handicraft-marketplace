app.controller("storeListCtrl", ["$scope", "$log", "store", function ($scope, $log, store) {
    function init() {
        store.getByCategory($scope.id).then(
            function (resutls) {
                $scope.stores = resutls;
            }
        );
    }

    init();
}]);