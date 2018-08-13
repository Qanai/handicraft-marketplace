app.factory("cartSrv", ["$q", "$log", "$filter", "user", "productService", "store", function ($q, $log, $filter, user, productService, store) {
    function CartProduct(plainObj) {
        this.productId = plainObj.productId;
        this.quantity = plainObj.quantity;
    }

    function Cart(plainCart) {
        this.userId = plainCart.userId;
        this.products = plainCart.products || [];
    }
    Cart.prototype.getProductById = function (id) {
        return $filter("filter")(this.products, { productId: id });
    }

    var activeCart = create();

    function create(plainObj) {
        if (!plainObj) {
            plainObj = {};
        }

        return new Cart(plainObj);
    }

    function getProductCount() {
        return activeCart.products.length;
    }

    function addProduct(productData) {
        activeCart.products.push(new CartProduct(productData));
    }

    function removeProduct(product) {
        var ndx = activeCart.products.indexOf(product);
        activeCart.products.splice(ndx, 1);
    }

    function empty() {
        activeCart.products.splice(0, activeCart.products.length);
    }

    function getAllProducts() {
        var async = $q.defer();

        if (activeCart.products.length > 0) {
            var ids = activeCart.products.map(function (cartProd) {
                return cartProd.productId;
            });

            productService.getListById(ids).then(
                function (prodList) {
                    prodList.forEach(function (prod) {
                        prod.quantity = activeCart.getProductById(prod.id);
                    });
                    async.resolve(prodList);
                },
                function (err) {
                    $log.error(err);
                    async.regect("No product in cart");
                }
            );
        } else {
            async.reject("Cart is empty");
        }

        return async.promise;
    }

    return {
        create: create,
        getProductCount: getProductCount,
        addProduct: addProduct,
        removeProduct: removeProduct,
        empty: empty,
        getAllProducts: getAllProducts
    }
}]);