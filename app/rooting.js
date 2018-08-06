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
            templateUrl: "app/components/categories/categoryPageView.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}]);