app.controller("categoryGallery", ["$scope", "$location", "$log", "category", function ($scope, $location, $log, category) {
    $scope.init = function (random) {        
        category.getAll().then(
            function (categories) {
                if (random) {
                    var randomList = [];
                    for (var i = 0; i < 3; i++) {
                        var cat = categories.splice(Math.floor(Math.random() * categories.length), 1)[0];
                        randomList.push(cat);
                    }
                    $scope.categories = randomList;
                } else {
                    $scope.categories = categories;
                }
            },
            function (err) {
                $log.error(err);
            }
        );
    }
}]);