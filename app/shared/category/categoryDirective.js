app.directive("categoryList", function(){
    return {
        scope: {
            resource: "="
        },
        templateUrl: "app/shared/category/categoryListView.html",
        controller: "categoryListCtrl",
        replace: true
    }
});