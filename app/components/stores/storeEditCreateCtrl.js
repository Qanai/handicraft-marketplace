app.controller("storeEditCreate", ["$scope", "$routeParams", "$location", "$log", "store", function ($scope, $routeParams, $location, $log, store) {
    // $scope.id = -1;
    // $scope.name = "";
    // $scope.about = "";
    // $scope.imageUrl = "";
    // $scope.address = {};
    // $scope.rating = 0;
    // $scope.sales = 0;
    // $scope.joined = new Date().getTime();
    // $scope.categoryId = [];
    // $scope.userId = -1;
    // $scope.user = null;

    $scope.editedStore = null;
    
    function init() {
        var storeId = parseInt($routeParams.storeId);
        if (isNaN(storeId)) {
            $scope.editedStore = store.create();
        } else {
            store.getById(storeId).then(
                function (dbStore) {
                    $scope.editedStore = dbStore;
                }
            );
        }        
    }

    init();
}]);