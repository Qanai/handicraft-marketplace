app.factory("store", ["$http", "$q", "$log", "dataSource", "user", function ($http, $q, $log, dataSource, user) {
    function Address(plainAddr) {
        this.street = plainAddr ? plainAddr.street : "";
        this.city = plainAddr ? plainAddr.city : "";
        this.country = plainAddr ? plainAddr.country : "";
    }

    function Store(plainStore) {
        this.id = plainStore.id;
        this.name = plainStore.name;
        this.about = plainStore.about;
        this.imageUrl = plainStore.imageUrl || (plainStore.id ? ("https://loremflickr.com/620/510/" + plainStore.name.split(' ')[0] + "?random=" + plainStore.id) : "");
        this.address = new Address(plainStore.address);
        this.rating = plainStore.rating;
        this.sales = plainStore.sales;
        this.joined = plainStore.joined ? (new Date(plainStore.joined)) : null;
        this.categoryId = plainStore.categoryId || [];
        this.userId = plainStore.userId;
        this.user = user.create(plainStore.user);
    }

    function create(plainObj) {
        var async = $q.defer();

        if (!plainObj) {
            plainObj = {
                userId: user.getActiveUserId(),
                joined: (new Date()).getTime()
            };
        }

        var prod = new Store(plainObj);
        async.resolve(prod);

        return async.promise;
    }

    function getAll() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "stores?_expand=user").then(
            function (response) {
                var allStores = [];
                response.data.forEach(function (s) {
                    allStores.push(new Store(s));
                });
                async.resolve(allStores);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading all the stores");
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

    function getByUser(userId) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "stores?userId=" + userId).then(
            function (response) {
                if (response && response.data && response.data.length > 0) {
                    var userStores = [];
                    response.data.forEach(function (s) {
                        userStores.push(new Store(s));
                    });

                    async.resolve(userStores);
                } else {
                    async.reject("Not found stores for user: " + userId);
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading stores f user: " + userId);
            }
        );

        return async.promise;
    }

    function add(storeData) {
        var async = $q.defer();

        $http.post(dataSource.databaseUrl + "stores", storeData).then(
            function (response) {
                var newStore = new Store(response.data);
                async.resolve(newStore);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed creating new store");
            }
        );

        return async.promise;
    }

    function update(storeData) {
        var async = $q.defer();

        $http.put(dataSource.databaseUrl + "stores/" + storeData.id, storeData).then(
            function (response) {
                var newStore = new Store(response.data);
                async.resolve(newStore);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed updating store: " + storeData.id);
            }
        );

        return async.promise;
    }

    return {
        create: create,
        getAll: getAll,
        getByCategory: getByCategory,
        getById: getById,
        getByUser: getByUser,
        add: add,
        update: update
    }
}]);