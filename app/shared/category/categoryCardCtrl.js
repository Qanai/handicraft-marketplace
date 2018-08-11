app.controller("categoryCardCtrl", ["$scope", "$location", "$log", function($scope, $location, $log){
    $scope.edit = function(categoryId, ev) {
        ev.stopPropagation();

        $location.path("/category/edit/" + categoryId);
    }
    
    $scope.select = function (id) {
        $location.path("/category/" + id);
    }
}]);