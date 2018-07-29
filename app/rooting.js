app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/home/home.html"
        })
        .when("/categories", {
            templateUrl: "app/components/categories/categoriesView.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}]);