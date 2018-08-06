app.factory("role", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function Role(plainRole) {
        this.id = plainRole.id;
        this.name = plainRole.name;
    }

    function create(plainRole) {
        return plainRole ? new Role(plainRole) : null;
    }

    function getAll() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "roles").then(
            function (response) {
                async.resolve(response.data);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading roles");
            }
        );

        return async.promise;
    }

    function getByName(roleName) {
        var async = $q.defer();

        $http.get(dataSource.dabaseUrl + "roles?name_like=" + roleName).then(
            function (response) {
                if (response && response.data && response.data.length == 1) {
                    var role = new Role(response.data[0]);
                    async.resolve(role);
                } else {
                    async.reject("Role not found ('" + roleName + "')");
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading role: '" + roleName + "'");
            }
        );

        return async.promise;
    }

    return {
        create: create,
        getAll: getAll,
        getByName: getByName
    }
}]);