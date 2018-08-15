app.factory("category", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function Category(plainCategory) {
        this.id = plainCategory.id;
        this.name = plainCategory.name;
        this.imageUrl = plainCategory.imageUrl;
    }

    function createNew(plain) {
        return new Category(plain);
    }

    function getAll() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "categories").then(
            // $http.get(dataSource.databaseUrl).then(
            function (response) {
                var categories = [];

                response.data.forEach(function (category) {
                    categories.push(new Category(category));
                });

                async.resolve(categories);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading categories");
            }
        );

        return async.promise;
    }

    function getById(categoryId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "categories/" + categoryId).then(
            function (response) {
                async.resolve(response.data);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading category: " + categoryId);
            }
        );

        return async.promise;
    }

    function getListByIds(ids) {
        var async = $q.defer();

        var qryIds = ids.map(function (id) {
            return "id=" + id;
        });

        var query = "categories?" + qryIds.join("&");

        $http.get(dataSource.databaseUrl + query).then(
            function (response) {
                if (response && response.data && response.data.length > 0) {
                    var catList = [];
                    response.data.forEach(function (c) {
                        catList.push(new Category(c));
                    });

                    async.resolve(catList);
                } else {
                    async.reject("Not found");
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading categories: " + ids.join(", "));
            }
        );

        return async.promise;
    }

    return {
        createNew: createNew,
        getAll: getAll,
        getListByIds: getListByIds,
        getById: getById
    }
}]);