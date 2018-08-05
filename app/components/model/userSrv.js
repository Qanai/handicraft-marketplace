app.factory("user", ["$http", "$q", "$log", "role", "dataSource", function ($http, $q, $log, role, dataSource) {
    function User(plainUser) {
        this.id = plainUser.id;
        this.name = plainUser.name;
        this.email = plainUser.email;
        this.roleId = plainUser.roleId;
        this.role = role.create(plainUser.role);
    }

    var activeUser = null;

    function login(email, passwor) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "users?email=" + email + "&_expand=role").then(
            function (response) {
                if (response && response.data && response.data.length == 1) {
                    var plainUser = response.data[0];
                    if (plainUser.password === password) {
                        activeUser = new User(plainUser);
                        async.resolve(activeUser);
                    }
                }
            },
            function (err) {
                $log.error(err);
                async.reject("Failed loading user");
            }
        );

        return async.promise;
    }

    return {
        login: login
    }
}]);