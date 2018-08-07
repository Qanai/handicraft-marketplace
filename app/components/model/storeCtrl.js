app.factory("store", ["$http", "$q", "$log", "dataSource", "user", function ($http, $q, $log, dataSource, user) {
    function Store(plainStore) {
        this.id = plainStore.id;
        this.name = plainStore.name;
        this.url = plainStore.url
        this.rating = plainStore.rating;
        this.categoryId = plainStore.categoryId || [];
        this.userId = plainStore.userId;
        this.user = user.create(plainStore.user);
    }

    function create(plainObj) {
        return plainObj ? new Store(plainObj) : null;
    }

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
        create: create,
        getAll: getAll,
        getByCategory: getByCategory
    }
}]);