app.controller("categoryListCtrl", ["$scope", "$location", "$routeParams", "$log", "category", function($scope, $location, $routeParams, $log, category){
    function init() {
        var ids = [];
        
        for (var i = 0; i < $scope.resource.length; i++) {
            var pcid = $scope.resource[i].categoryId;
            for(j = 0; j < pcid.length; j++){
                if(ids.indexOf(pcid[j]) == -1){
                    ids.push(pcid[j]);
                }
            }
        }

        category.getListByIds(ids).then(
            function(catList){
                $scope.categories = catList;
            }
        );
    }

    init();
}]);