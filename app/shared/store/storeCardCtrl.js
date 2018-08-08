app.controller("storeCardCtrl", ["$scope", "$location", "$log", function ($scope, $location, $log) {
    $scope.displayStore = function (storeId) {
        $location.path("/store/" + storeId);
    }
}]);