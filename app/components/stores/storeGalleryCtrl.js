app.controller("storeGallery", ["$scope", "store", function ($scope, store) {
    store.getAll().then(
        function (results) {
            var randomList = [];
            for (var i = 0; i < 3; i++) {
                var st = results.splice(Math.floor(Math.random() * results.length), 1)[0];
                randomList.push(st);
            }
            $scope.stores = randomList;
        }
    );
}]);