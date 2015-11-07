
e2eApp.controller("HomeController", function ($scope, $q, PlaceService, $state) {

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
        PlaceService.loadPlaces(query).then(function(){
            defer.resolve(PlaceService.places);
        });
        return defer.promise;
    };

    $scope.doSearch = function(){
        var placeids = [];
        angular.forEach($scope.places, function(place){
            placeids.push(place.id + ':' + place.text);
        });

        var query = {'places': placeids.join(','), 'rent' : $scope.rent, 'sale' : $scope.sale};

        $state.go('search', query, {location: true})

    }
});

e2eApp.controller(
    "SearchController",
    ['$scope', '$q', '$stateParams', '$state', 'HelperService','PropertyService','PlaceService', 'Property',
    function ($scope,$q, $stateParams, $state, HelperService, PropertyService, PlaceService, Property) {

        var places = $stateParams.places.split(','), placeids = [];
        $scope.sale = $stateParams.sale === 'true';
        $scope.rent = $stateParams.rent === 'true';
        $scope.places = HelperService.rebuildPlacesArray(places);
        $scope.markers = [];

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

        angular.forEach($scope.places, function(place){
            placeids.push(place.id);
        });

        placeids = placeids.join(',');
        $scope.props = PropertyService.loadProps(placeids, $scope.rent, $scope.sale)

        $scope.doSearch = function(){
            var placeids = [];
            angular.forEach($scope.places, function(place){
                placeids.push(place.id + ':' + place.text);
            });

            var query = {'places': placeids.join(','), 'rent' : $scope.rent, 'sale' : $scope.sale};

            $state.go('search', query, {location: true})

        }

        $scope.loadTags = function(query) {
            var defer = $q.defer();
            PlaceService.loadPlaces(query).then(function(){
                defer.resolve(PlaceService.places);
            });
            return defer.promise;
        };

        $scope.map = { center: { latitude: 1.434832, longitude: 103.796258 }, zoom: 15 };

        $scope.props.$promise.then(function(e){
            angular.forEach(e.properties, function(prop, index){
                $scope.markers.push({
                    id: index,
                    latitude: prop.location.coordinates[1],
                    longitude: prop.location.coordinates[0],
                    title: prop.name
                });
            });
            console.log($scope.markers);
        });

}]);
