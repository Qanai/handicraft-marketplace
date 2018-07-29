app.factory("category", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function Category(plainCategory) {
        this.id = plainCategory.id;
        this.name = plainCategory.name;
        this.imageUrl = plainCategory.imageUrl;
    }

    function getAll() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "categories").then(
            function (response) {
                var categories = [];

                response.data.forEach(function (category) {
                    categories.push(new Category(category));
                });

                async.resolve(categories);
            },
            function (err) {
                $log.error(err);
                async.reject("Error: failed loading countries");
            }
        );

        return async.promise;
    }

    return {
        getAll: getAll
    }
}]);