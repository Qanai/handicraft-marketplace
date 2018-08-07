app.factory("productService", ["$http", "$q", "$log", "dataSource", "store", function ($http, $q, $log, dataSource, store) {
    function Product(plainProduct) {
        this.id = plainProduct.id;
        this.name = plainProduct.name;
        this.description = plainProduct.description;
        this.imageUrl = plainProduct.imageUrl;
        this.storeId = plainProduct.storeId;
        this.categoryId = plainProduct.categoryId || [];
        this.price = plainProduct.price;
        this.added = plainProduct.added ? new Date(plainProduct.added) : null;
        this.storeId = plainProduct.storeId;
        this.store = store.create(plainProduct.store);
    }

    function getByCategory(categoryId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "products?categoryId_like=" + categoryId + "&_expand=store").then(
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

    function getNew(limit) {
        var async = $q.defer();

        limit = limit || 100;

        $http.get(dataSource.databaseUrl + "products?_expand=store&_sort=added&_order=desc&_limit=" + limit).then(
            function (response) {
                var products = [];
                response.data.forEach(function (prod) {
                    products.push(new Product(prod));
                });
                async.resolve(products);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading new products");
            }
        );

        return async.promise;
    }

    function getById(productId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "products?id=" + productId + "&_expand=store").then(
            function (response) {
                if (response && response.data && response.data.length == 1) {
                    var prod = new Product(response.data[0]);
                    async.resolve(prod);
                } else {
                    async.reject("Product " + productId + " not found");
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Faliled to load produtc: " + productId);
            }
        );

        return async.promise;
    }

    return {
        getByCategory: getByCategory,
        getNew: getNew,
        getById: getById
    }
}]);