app.directive("productCard", function(){
    return {
        scope: {
            product: "="
        },
        templateUrl: "app/shared/product/prodCardView.html",
        controller: "productCardCtrl",
        replace: true
    }
});