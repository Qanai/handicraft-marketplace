app.factory("dataSource", [function () {
    var databaseUrl = "http://localhost:3000/";

    return {
        databaseUrl: databaseUrl
    }
}]);