app.factory("sortService", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function ProductSort(plainObj) {
        this.id = plainObj.id;
        this.field = plainObj.field;
        this.title = plainObj.title;
    }

    function getProductCardSortOptions() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "product-sort").then(
            function (response) {
                var results = [];
                response.data.forEach(function(opt){
                    results.push(new ProductSort(opt));
                });

                async.resolve(results);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading product sort options")
            }
        );

        return async.promise;
    }

    return {
        getProductCardSortOptions: getProductCardSortOptions
    }
}]);