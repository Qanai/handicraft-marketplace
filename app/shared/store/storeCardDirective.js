app.directive("storeCard", function(){
    return {
        scope: {
            list: "=",
            manage: "@",
            ngclass: "@"
        },
        templateUrl: "app/shared/store/storeCardView.html",
        controller: "storeCardCtrl",
        replace: true
    }
});