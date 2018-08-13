app.factory("cartSrv", ["$q", "$log", "$filter", "user", "productService", "store", function ($q, $log, $filter, user, productService, store) {
    function CartProduct(plainObj) {
        this.product = plainObj.product;
        this.quantity = plainObj.quantity;
    }
    CartProduct.prototype.wholePrice = function () {
        return this.product.price * this.quantity;
    }

    function Cart(plainCart) {
        this.userId = plainCart.userId;
        this.products = plainCart.products || [];
    }
    Cart.prototype.getProductById = function (id) {
        return $filter("filter")(this.products, {
            productId: id
        });
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
        return activeCart.products;
    }

    function getProductPrice(product) {
        return product.wholePrice();
    }

    function getTotalItems() {
        var count = 0;

        for(var i = 0; i < activeCart.products.length; i++){
            count += activeCart.products[i].quantity;
        }

        return count;
    }

    function cartPrice() {
        var price = 0;

        for(var i = 0; i < activeCart.products.length; i++){
            price += activeCart.products[i].wholePrice();
        }

        return price;
    }

    return {
        create: create,
        getProductCount: getProductCount,
        addProduct: addProduct,
        removeProduct: removeProduct,
        empty: empty,
        getAllProducts: getAllProducts,
        getProductPrice: getProductPrice,
        cartPrice: cartPrice,
        getTotalItems: getTotalItems
    }
}]);