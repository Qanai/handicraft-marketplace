app.directive("storeList", function () {
    return {
        scope: {
            id: "="
        },
        restrict: "E",
        templateUrl: "app/shared/store/storesListView.html",
        controller: "storeListCtrl"
    }
});