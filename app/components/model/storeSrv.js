app.factory("store", ["$http", "$q", "$log", "dataSource", "user", function ($http, $q, $log, dataSource, user) {
    function Address(plainAddr) {
        this.street = plainAddr.street;
        this.city = plainAddr.city;
        this.country = plainAddr.country;
    }

    function Store(plainStore) {
        this.id = plainStore.id;
        this.name = plainStore.name;
        this.about = plainStore.about;
        this.address = new Address(plainStore.address);
        this.rating = plainStore.rating;
        this.sales = plainStore.sales;
        this.joined = plainStore.joined ? (new Date(plainStore.joined)) : null;
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
                if (response && response.data) {
                    var catStores = [];
                    response.data.forEach(function (s) {
                        catStores.push(new Store(s));
                    });
                    async.resolve(catStores);
                } else {
                    async.reject("Stores not found - category: " + categoryId);
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Error loading stores by category: " + categoryId);
            }
        );

        return async.promise;
    }

    function getById(storeId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "stores/" + storeId + "?_expand=user").then(
            function (response) {
                if (response && response.data) {
                    var store = new Store(response.data);
                    async.resolve(store);
                } else {
                    async.reject("Store not found: " + storeId);
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loadin store: " + storeId);
            }
        );

        return async.promise;
    }

    return {
        create: create,
        getAll: getAll,
        getByCategory: getByCategory,
        getById: getById
    }
}]);