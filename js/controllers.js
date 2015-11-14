e2eApp.controller('PropertyController',['$scope', '$stateParams', 'PropertyService', function($scope, $stateParams, PropertyService){

    var id = $stateParams.id;
    $scope.myInterval = -1;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];

    $scope.prop = PropertyService.get(id);

    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };

    for (var i=0; i<4; i++) {
        $scope.addSlide();
    }

}]);

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
        $scope.selectedMarker = false;

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

        $scope.map = {
            center: { latitude: 1.434832, longitude: 103.796258 },
            zoom: 15,
            options: {

            }
        };
        var bound = new google.maps.LatLngBounds();

        $scope.props.$promise.then(function(e){
            angular.forEach(e.properties, function(prop, index){
                var marker = {
                    id: index,
                    hashId : prop.id,
                    coords: {
                        latitude: prop.location.coordinates[1],
                        longitude: prop.location.coordinates[0]
                    },
                    options: {
                        name: prop.name,
                        cover_image : '/images/properties/1.jpg'//prop.cover_image
                    },
                    show : false,

                    events: {
                        click: function(){
                            $scope.selectedMarker = marker;
                            marker.show  = !marker.show;
                        }
                    }
                };
                $scope.markers.push(marker);
                bound.extend( new google.maps.LatLng(prop.location.coordinates[1],prop.location.coordinates[0]) );
            });
            bound.zoom
            $scope.map.center =  { latitude: bound.getCenter().lat(), longitude: bound.getCenter().lng() };//bound.getCenter();
        });
}]);
