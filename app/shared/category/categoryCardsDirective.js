app.directive("categoryCards", [function(){
    return {
        scope: {
            list: "=",
            manage: "@"
        },
        templateUrl:"app/shared/category/categoryCardsView.html",
        controller: "categoryCardCtrl"
    }
}]);