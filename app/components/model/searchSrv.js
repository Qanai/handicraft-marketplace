app.factory("searchService", ["$http", "$q", "$log", "dataSource", "category", "store", "productService", "user", function ($http, $q, $log, dataSource, category, store, productService, user) {
    function SearchType(plainObj) {
        this.id = plainObj.id;
        this.title = plainObj.title;
        this.path = plainObj.path;
    }

    function SearchResult(plainObj) {
        this.path = plainObj.path;
        this.result = plainObj.result;
    }

    function filterResults(arr, title, qry) {
        var res = arr.filter(function (obj) {
            switch (title) {
                case "Categories":
                    return (obj.name.toLowerCase().indexOf(qry.toLowerCase()) != -1);

                case "Stores":
                    return ((obj.name.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.about.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.address.street.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.address.city.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.address.country.toLowerCase().indexOf(qry.toLowerCase()) != -1));

                case "Products":
                    return ((obj.name.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.description.toLowerCase().indexOf(qry.toLowerCase()) != -1));

                case "Sellers":
                    return ((obj.name.toLowerCase().indexOf(qry.toLowerCase()) != -1) ||
                        (obj.email.toLowerCase().indexOf(qry.toLowerCase()) != -1));

                default:
                    break;
            }
        });

        return res;
    }

    function getSearchTypes() {
        var async = $q.defer();

        $http.get(dataSource.databaseUrl + "search-types").then(
            function (response) {
                var resTypes = [];
                response.data.forEach(function (st) {
                    resTypes.push(new SearchType(st));
                });

                async.resolve(resTypes);
            },
            function (err) {
                $log.error(err);
                async.reject("Fail loading search types");
            }
        );

        return async.promise;
    }

    function search(query, searchPath, title) {
        var async = $q.defer();

        var conj = (searchPath.toLowerCase().indexOf("?") == -1) ? "?" : "&";
        var searchQuery = searchPath + conj + "q=" + query;

        $http.get(dataSource.databaseUrl + searchQuery).then(
            function (response) {
                var results = [];
                var sourses = filterResults(response.data, title, query);
                sourses.forEach(function (r) {
                    var res = {
                        path: searchPath
                    };

                    switch (title) {
                        case "Categories":
                            res.result = category.createNew(r);
                            break;

                        case "Stores":
                            res.result = store.create(r);
                            break;

                        case "Products":
                            res.result = productService.createNew(r);
                            break;

                        case "Sellers":
                            res.result = user.create(r);
                            break;

                        default:
                            break;
                    }

                    results.push(new SearchResult(res));
                });

                async.resolve(results);
            },
            function (err) {
                $log.error(err);
                async.reject("Fail loading search results");
            }
        );

        return async.promise;
    }

    return {
        getSearchTypes: getSearchTypes,
        search: search
    }
}]);