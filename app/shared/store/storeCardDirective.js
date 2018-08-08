app.directive("storeCard", function(){
    return {
        scope: {
            list: "="
        },
        templateUrl: "app/shared/store/storeCardView.html",
        controller: "storeCardCtrl",
        replace: true
    }
});