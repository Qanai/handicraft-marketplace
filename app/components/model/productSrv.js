app.factory("productService", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function Product(plainProduct) {
        this.id = plainProduct.id;
        this.name = plainProduct.name;
        this.description = plainProduct.description;
        this.imageUrl = plainProduct.imageUrl;
        this.storeId = plainProduct.storeId;
        this.categoryId = plainProduct.categoryId || [];
    }

    function getByCategory(categoryId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "products?categoryId_like=" + categoryId).then(
            function (response) {
                var products = [];
                response.data.forEach(function (prod) {
                    products.push(new Product(prod));
                });
                async.resolve(products);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading products by category");
            }
        );

        return async.promise;
    }

    return {
        getByCategory: getByCategory
    }
}]);