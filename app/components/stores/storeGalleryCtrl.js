app.controller("storeGallery", ["$scope", "store", function ($scope, store) {
    store.getAll().then(
        function (results) {
            var resCount = results.length;
            var randomList = [];
            for (var i = 0; i < Math.min(resCount, 3); i++) {
                var st = results.splice(Math.floor(Math.random() * results.length), 1)[0];
                randomList.push(st);
            }
            $scope.stores = randomList;
        }
    );
}]);