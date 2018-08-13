app.factory("dataSource", [function () {
    var databaseUrl = "https://jsrv-handi-market.herokuapp.com/";
    // var databaseUrl = "http://localhost:4000/";
    // var databaseUrl = "app/components/model/db.json"; 

    return {
        databaseUrl: databaseUrl
    }
}]);