app.factory("dataSource", [function () {
    //var databaseUrl = "http://localhost:3000/";
    var databaseUrl = "app/components/model/db.json"; 

    return {
        databaseUrl: databaseUrl
    }
}]);