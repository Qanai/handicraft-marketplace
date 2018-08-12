app.controller("productEditCreate", ["$scope", "$location", "$log", "$routeParams", "productService", "user", "category", function ($scope, $location, $log, $routeParams, productService, user, category) {
    // Checking if the user is logged in, if not navigating back to home page
    if (!user.isAuthenticated() || !user.isAuthorized("Seller")) {
        $location.path("/");
        return;
    }

    $scope.editedProduct = null;

    function init() {
        // $log.log($routeParams);
        var getProductPromise = null;

        var productId = parseInt($routeParams.productId);
        if (isNaN(productId)) {
            getProductPromise = productService.create($routeParams.storeId);
        } else {
            getProductPromise = productService.getById(productId);
        }

        getProductPromise.then(
            function (newProd) {
                $scope.editedProduct = newProd;
                return category.getAll();
            }
        ).then(
            function (results) {
                var allCats = [];
                results.forEach(function (cat) {
                    var choiceCat = cat;
                    choiceCat.selected = $scope.editedProduct.categoryId.some(function (c) {
                        return choiceCat.id == c;
                    });

                    allCats.push(choiceCat);
                });
                $scope.allCategories = allCats;
            }
        );
    }

    function setCategories() {
        $scope.editedProduct.categoryId.splice(0, $scope.editedProduct.categoryId.length);
        for (var i = 0; i < $scope.allCategories.length; i++) {
            if ($scope.allCategories[i].selected) {
                $scope.editedProduct.categoryId.push($scope.allCategories[i].id);
            }
        }
    }

    function setImage() {
        if ($scope.image) {
            $scope.editedProduct.imageUrl = $scope.image.dataURL;
        }
    }

    function updateProduct() {
        // Edit product categories
        setCategories();

        // Edit product image
        setImage();

        // Update product in DB 
        var updateData = Object.assign({}, $scope.editedProduct);
        delete updateData.store;
        productService.update(updateData).then(
            function (updatedProduct) {
                $location.path("/store/edit/" + updatedProduct.storeId);
            },
            function (err) {
                $log.error(err);
            }
        );

    }

    function addProduct() {
        // Edit product categories
        setCategories();

        // Edit product image
        setImage();

        // Update product in DB
        var addData = Object.assign({}, $scope.editedProduct);
        delete addData.store;
        productService.add(addData).then(
            function (newProduct) {
                $location.path("/store/edit/" + newProduct.storeId);
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    $scope.editProduct = function () {
        if ($scope.editedProduct.id) {
            updateProduct();
        } else {
            addProduct();
        }
    }

    init();
}]);