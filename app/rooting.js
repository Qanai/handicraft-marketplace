app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/home/home.html",
            controller: "home"
        })
        .when("/login", {
            templateUrl: "app/components/login/loginView.html",
            controller: "login"
        })
        .when("/account/:spec", {
            templateUrl: "app/components/login/accountView.html",
            controller: "account"
        })
        .when("/categories", {
            templateUrl: "app/components/categories/categoriesView.html",
            controller: "categoryGallery"
        })
        .when("/category/:categoryId", {
            templateUrl: "app/components/categories/categoryPageView.html",
            controller: "categoryProducts"
        })
        .when("/newproducts", {
            templateUrl: "app/components/products/newProductsView.html",
            controller: "newProducts"
        })
        .when("/product/:productId", {
            templateUrl: "app/components/products/productDetailsView.html",
            controller: "productDetails"
        })
        .when("/store/:storeId", {
            templateUrl: "app/components/stores/storeDetailsView.html",
            controller: "storeDetails"
        })
        .when("/dashboard", {
            templateUrl: "app/components/dashboard/dashboardView.html",
            controller: "dashboard"
        })
        .otherwise({
            redirectTo: "/"
        })
}]);