app.factory("role", ["$http", "$q", "$log", "dataSource", function ($http, $q, $log, dataSource) {
    function Role(plainRole) {
        this.id = plainRole.id;
        this.name = plainRole.name;
    }

    function create(plainRole) {
        return plainRole ? new Role(plainRole) : null;
    }

    return {
        create: create
    }
}]);