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
        // $log.log($routeParams);
        var getStore = null;

        var storeId = parseInt($routeParams.storeId);
        if (isNaN(storeId)) {
            // $scope.editedStore = store.create();
            getStore = store.createAsync();
        } else {
            getStore = store.getById(storeId);
        }

        getStore.then(
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

        // $timeout(function () {
        //     $log.log($scope.editedStore);
        // }, 2000);
    }

    function setCategories() {
        $scope.editedStore.categoryId.splice(0, $scope.editedStore.categoryId.length);
        for (var i = 0; i < $scope.allCategories.length; i++) {
            if ($scope.allCategories[i].selected) {
                $scope.editedStore.categoryId.push($scope.allCategories[i].id);
            }
        }
    }

    function setImage() {
        if ($scope.image) {
            $scope.editedStore.imageUrl = $scope.image.dataURL;
        }
    }

    function setEditData() {
        var updateData = Object.assign({}, $scope.editedStore);
        delete updateData.user;
        delete updateData.products;
        return updateData;
    }
    
    function updateStore() {
        // Edit store categories
        setCategories();

        // Edit store image
        setImage();

        // Update store in DB
        var updateData = setEditData();
        store.update(updateData).then(
            function (updatedStore) {
                // $scope.editedStore = updatedStore;
                init();
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    function addStore() {
        // Edit store categories
        setCategories();

        // Edit store image
        setImage();

        // Update store in DB
        var addData = setEditData();
        store.add(addData).then(
            function (newStore) {
                $location.path("/dashboard");
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    $scope.editStore = function () {
        // $log.log($scope.allCategories);
        // $log.log($scope.editedStore);
        // $log.log($scope.image);

        if ($scope.editedStore.id) {
            updateStore();
        } else {
            addStore();
        }
    }

    $scope.addProduct = function(){
        $location.path("/product/edit/new/" + $scope.editedStore.id);
    }

    init();
}]);