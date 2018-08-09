app.directive("storeCard", function(){
    return {
        scope: {
            list: "=",
            manage: "@"
        },
        templateUrl: "app/shared/store/storeCardView.html",
        controller: "storeCardCtrl",
        replace: true
    }
});