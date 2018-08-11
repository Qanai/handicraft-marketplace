app.controller("storeEditCreate", ["$scope", "$routeParams", "$location", "$log", "$timeout", "store", "category", "productService", "user", function ($scope, $routeParams, $location, $log, $timeout, store, category, productService, user) {
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

    // Checking if the user is logged in, if not navigating back to home page
    if (!user.isAuthenticated() || !user.isAuthorized("Seller")) {
        $location.path("/");
        return;
    }

    $scope.editedStore = null;

    function init() {
        var storeId = parseInt($routeParams.storeId);
        if (isNaN(storeId)) {
            $scope.editedStore = store.create();
        } else {
            store.getById(storeId).then(
                function (dbStore) {
                    $scope.editedStore = dbStore;
                    return productService.getByStore(dbStore.id);
                }
            ).then(
                function (prods) {
                    $scope.editedStore.products = prods;
                    return category.getAll();
                },
                function (err) {
                    $scope.editedStore.products = [];
                    return category.getAll();
                }
            ).then(
                function (results) {
                    var allCats = [];
                    results.forEach(function (cat) {
                        var choiceCat = cat;
                        choiceCat.selected = $scope.editedStore.categoryId.some(function (c) {
                            return choiceCat.id == c;
                        });

                        allCats.push(choiceCat);
                    });
                    $scope.allCategories = allCats;
                }
            );
        }

        // $timeout(function () {
        //     $log.log($scope.editedStore);
        // }, 2000);
    }

    init();

    $scope.editStore = function () {
        // $log.log($scope);
        $log.log($scope.editedStore);
    }
}]);