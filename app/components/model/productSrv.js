app.factory("productService", ["$http", "$q", "$log", "$timeout", "dataSource", "store", function ($http, $q, $log, $timeout, dataSource, store) {
    function Product(plainProduct) {
        this.id = plainProduct.id;
        this.name = plainProduct.name;
        this.description = plainProduct.description;
        this.imageUrl = plainProduct.imageUrl;
        this.storeId = plainProduct.storeId;
        this.categoryId = plainProduct.categoryId || [];
        this.price = plainProduct.price;
        this.rating = plainProduct.rating || 0;
        this.sales = plainProduct.sales || 0;
        this.added = plainProduct.added ? new Date(plainProduct.added) : null;
        this.storeId = plainProduct.storeId;
        this.store = store.create(plainProduct.store);
    }

    function create(storeId) {
        var async = $q.defer();

        store.getById(storeId).then(
            function (objStore) {
                var plainObj = {
                    storeId: storeId,
                    store: objStore,
                    added: (new Date()).getTime()
                };

                var prod = createNew(plainObj);
                // $timeout(function () {
                //     $log.log(prod.store);
                // }, 2000);
                async.resolve(prod);
            }
        );

        return async.promise;
    }

    function createNew(plain) {
        return new Product(plain);
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
                async.reject("Faliled to load product: " + productId);
            }
        );

        return async.promise;
    }

    function getByStore(storeId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "products?storeId=" + storeId).then(
            function (response) {
                if (response && response.data && response.data.length > 0) {
                    var prods = [];
                    response.data.forEach(function (p) {
                        var storeProd = new Product(p);
                        prods.push(storeProd);
                    });

                    async.resolve(prods);
                } else {
                    async.reject("Store products not found");
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Faliled to load products (store: " + storeId + ")");
            }
        );

        return async.promise;
    }

    function getListById(idList) {
        var async = $q.defer();

        var qryIds = idList.map(function (id) {
            return "id=" + id;
        });

        var query = "products?" + qryIds.join("&");

        $http.get(dataSource.databaseUrl + query + "&_expand=store").then(
            function (response) {
                if (response.data.length > 0) {
                    var prodList = [];
                    response.data.forEach(function (p) {
                        prodList.push(new Product(p));
                    });

                    async.resolve(prodList);
                } else {
                    async.reject("Not found");
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading products: " + ids.join(", "));
            }
        );

        return async.promise;
    }

    function add(productData) {
        var async = $q.defer();

        $http.post(dataSource.databaseUrl + "products", productData).then(
            function (response) {
                var newProduct = new Product(response.data);
                async.resolve(newProduct);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed creating new store");
            }
        );

        return async.promise;
    }

    function update(productData) {
        var async = $q.defer();

        $http.patch(dataSource.databaseUrl + "products/" + productData.id, productData).then(
            function (response) {
                var updatedProduct = new Product(response.data);
                async.resolve(updatedProduct);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed updating store: " + productData.id);
            }
        );

        return async.promise;
    }

    function deleteProduct(product) {
        var async = $q.defer();

        var productData = Object.assign({}, product);
        delete productData.store;

        async.reject("json-server has a bug in delete operation");

        // $http.delete(dataSource.databaseUrl + "products/" + productData.id, productData).then(
        //     function (response) {
        //         $log.log(response.data);
        //         async.resolve(response);
        //     },
        //     function (err) {
        //         $log.error(err);
        //         async.reject("Failed to dele product " + product.id);
        //     }
        // );


        return async.promise;
    }

    return {
        create: create,
        createNew: createNew,
        getByCategory: getByCategory,
        getNew: getNew,
        getById: getById,
        getByStore: getByStore,
        getListById: getListById,
        add: add,
        update: update,
        deleteProduct: deleteProduct
    }
}]);