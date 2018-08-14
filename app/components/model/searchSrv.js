app.factory("searchService", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function SearchType(plainObj) {
        this.title = plainObj.title;
        this.path = plainObj.path;
    }

    function getSearchTypes() {
        var async = $d.defer();

        $http.get(dataSource.databaseUrl + "search-types").then(
            function (response) {
                var resTypes = [];
                response.data.forEach(function (st) {
                    resTypes.push(new SearchType(st));
                });

                async.resolve(resTypes);
            },
            function (err) {
                $log.error(err);
                async.reject("Fail loading search types");
            }
        );

        return async.promise;
    }

    return {
        getSearchTypes: getSearchTypes
    }
}]);