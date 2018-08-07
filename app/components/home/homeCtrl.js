app.controller("home", ["$scope", "$location", function ($scope, $location) {
    $scope.allCategories = function () {
        $location.path("/categories");
    }

    $scope.moreProducts = function () {
        $location.path("/newproducts");
    }
}])