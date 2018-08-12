app.directive("productCard", function () {
    return {
        scope: {
            product: "=",
            manage: "@"
        },
        templateUrl: "app/shared/product/prodCardView.html",
        controller: "productCardCtrl",
        replace: true
    }
});