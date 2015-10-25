
e2eApp.controller("HomeController", function ($scope, $q, placeService, $state) {

    $scope.places = [];
    $scope.sale = false;
    $scope.rent = false;

    $scope.toggle = function(value){
        if(value == 'sale') {
            $scope['sale'] = !$scope['sale'];
            $scope['rent'] = false;
        }
        else {
            $scope['rent'] = !$scope['rent'];
            $scope['sale'] = false;
        }
    }

    $scope.isActive = function (value) {
        return $scope[value];
    }

    $scope.loadTags = function(query) {
        var defer = $q.defer();
        placeService.loadPlaces(query).then(function(){
            defer.resolve(placeService.places);
        });
        return defer.promise;
    };

    $scope.doSearch = function(){
        var placeids = [];
        angular.forEach($scope.places, function(place){
            placeids.push(place.id);
        });

        var query = {'places': placeids.join(','), 'rent' : $scope.rent, 'sale' : $scope.sale};

        $state.go('search', query, {location: true})

    }
});

e2eApp.controller("SearchController", ['$scope','$stateParams', function ($scope, $stateParams) {



}]);
