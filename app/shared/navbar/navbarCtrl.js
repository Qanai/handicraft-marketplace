app.controller("navbarCtrl", ["$scope", "$location", "$log", "user", "cartSrv", "searchService", function ($scope, $location, $log, user, cartSrv, searchService) {
    function init() {
        searchService.getSearchTypes().then(
            function (results) {
                $scope.searchTypes = results;
                $scope.searchType = $scope.searchTypes[0];
            },
            function (err) {
                $log.error(err);
            }
        );
    }

    $scope.isAuthenticated = function () {
        return user.isAuthenticated();
    }

    $scope.isAuthorized = function (role) {
        return user.isAuthorized(role);
    }

    $scope.userName = function () {
        return user.getActiveUserName();
    }

    $scope.accountUrl = function () {
        return "account/" + user.getActiveUserId();
    }

    $scope.logout = function () {
        user.logout();
        $location.path("/");
    }

    $scope.cartCount = function () {
        return cartSrv.getProductCount();
    }

    $scope.searchMarket = function () {
        if ($scope.searchResults) {
            $scope.searchResults.splice(0, $scope.searchResults.length);
        }
        if ($scope.query.trim()) {
            searchService.search($scope.query, $scope.searchType.path, $scope.searchType.title).then(
                function (results) {
                    $log.log(results);
                    $scope.searchResults = results;
                },
                function (err) {
                    $log.error(err);
                }
            );
        }
    }

    $scope.redirect = function (path, id) {
        // $log.log(path + ", " + id);
        var url = "";
        var endPos = (path.indexOf("?") == -1) ? path.length : path.indexOf("?");
        var test = path.substr(0, endPos);
        switch (test) {
            case "categories":
                url = "/category/"
                break;

            case "stores":
                url = "/store/"
                break;

            case "products":
                url = "/product/"
                break;

            default:
                break;
        }
        $location.path(url + id);
    }

    init();
}]);