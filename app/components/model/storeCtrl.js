app.factory("store", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {

    function getAll() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "stores?_expand=user").then(
            function (response) {
                async.resolve(response.data);
            },
            function (err) {
                $log.error(err);
            }
        );

        return async.promise;
    }

    function getByCategory(categoryId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "stores?categoryId_like=" + categoryId + "&_expand=user").then(
            function (response) {
                async.resolve();
            },
            function (err) {
                $log.error(err);
                async.reject("Error loading stores by category: " + categoryId);
            }
        );

        return async.promise;
    }

    return {
        getAll: getAll,
        getByCategory: getByCategory
    }
}]);