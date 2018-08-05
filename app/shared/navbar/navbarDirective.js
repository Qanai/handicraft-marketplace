app.directive("navbar", [function() {
    return {
        templateUrl: "app/shared/navbar/navbarView.html",
        controller: "navbarCtrl",
        replace: true
    }
}]);