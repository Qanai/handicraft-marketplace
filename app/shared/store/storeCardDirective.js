app.directive("storeCard", function(){
    return {
        scope: {
            list: "=",
            manage: "@",
            ngclass: "@",
            align: "@"
        },
        templateUrl: "app/shared/store/storeCardView.html",
        controller: "storeCardCtrl",
        replace: true
    }
});