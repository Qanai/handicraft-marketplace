app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/home/home.html",
            controller: "home"
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