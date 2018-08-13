app.factory("cartSrv", ["user", "productService", "store", function (user, productService, store) {
    function Cart(plainCart) {
        this.userId = plainCart.userId;
        this.products = plainCart.products || [];
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

    function addProduct(id) {
        activeCart.products.push(id);
    }

    function removeProduct(id) {
        var ndx = activeCart.products.indexOf(id);
        activeCart.products.splice(ndx, 1);
    }

    function empty(){
        activeCart.products.splice(0, activeCart.products.length);
    }

    function getAllProducts() {
        
    }

    return {
        create: create,
        getProductCount: getProductCount,
        addProduct: addProduct,
        removeProduct: removeProduct,
        empty: empty
    }
}]);