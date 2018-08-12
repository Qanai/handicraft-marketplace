app.factory("user", ["$http", "$q", "$log", "role", "dataSource", function ($http, $q, $log, role, dataSource) {
    function User(plainUser) {
        this.id = plainUser.id;
        this.name = plainUser.name;
        this.email = plainUser.email;
        this.password = plainUser.password;
        this.roleId = plainUser.roleId;
        this.role = role.create(plainUser.role);
    }

    var activeUser = null;

    getById(5).then(
        function (u) {
            activeUser = u;
        }
    );

    // var activeUser = new User({
    //     "id": 1,
    //     "name": "Eliyahu Shlieserman",
    //     "email": "eliyahushli@gmail.com",
    //     "password": "1234",
    //     "roleId": 4,
    //     "role": {
    //         "id": 4,
    //         "name": "Admin"
    //     }
    // });

    function getById(id) {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "users/" + id + "?_expand=role").then(
            function (response) {
                var usr = new User(response.data);
                async.resolve(usr);
            },
            function (err) {
                $log.error(err);
                async.reject();
            }
        );

        return async.promise;
    }

    function create(plainObj) {
        return plainObj ? new User(plainObj) : null;
    }

    function login(email, password) {
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

    function isAuthenticated() {
        return activeUser ? true : false;
    }

    function isAuthorized(roleName) {
        return isAuthenticated() && (activeUser.role.name.toLowerCase() === roleName.toLowerCase());
    }

    function getActiveUserName() {
        return isAuthenticated() ? activeUser.name : "Guest";
    }

    function getActiveUserId() {
        return isAuthenticated() ? activeUser.id : -1;
    }

    function getActiveUserRole() {
        return isAuthenticated() ? activeUser.role : null;
    }

    function add(userData) {
        var async = $q.defer();

        $http.post(dataSource.databaseUrl + "users", userData).then(
            function (response) {
                var newUser = new User(response.data);
                async.resolve(newUser);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed creating new user");
            }
        );

        return async.promise;
    }

    function update(userData) {
        $log.log(userData);

        var async = $q.defer();

        $http.put(dataSource.databaseUrl + "users/" + userData.id, userData).then(
            function (response) {
                var newUser = new User(response.data);
                async.resolve(newUser);
            },
            function (err) {
                $log.error(err);
                async.reject("Failed updating store: " + storeData.id);
            }
        );

        return async.promise;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        create: create,
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized,
        getActiveUserName: getActiveUserName,
        getActiveUserId: getActiveUserId,
        getActiveUserRole: getActiveUserRole,
        getActiveUser: getActiveUser,
        add: add,
        update: update
    }
}]);