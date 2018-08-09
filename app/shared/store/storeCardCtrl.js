app.controller("storeCardCtrl", ["$scope", "$location", "$log", function ($scope, $location, $log) {
    $scope.displayStore = function (storeId) {
        $location.path("/store/" + storeId);
    }

    $scope.edit = function (storeId, ev) {
        ev.stopPropagation();

        $location.path("/store/edit/" + storeId);
    }
}]);