e2eApp.controller('PropertyAddController', ['$scope', function ($scope) {
}]);

e2eApp.controller(
    'PropertyEditController',
    ['$scope', '$stateParams', '$filter', 'PropertyService','FileUploader', 'Helper', 'Geocode', function ($scope, $stateParams, $filter, PropertyService, FileUploader, Helper, Geocode) {
        $scope.propertyHasImages = false;
        $scope.slides = [];
        $scope.property = PropertyService.get($stateParams.id);
        $scope.uploading = false;
        $scope.mouseOn = -1;
        $scope.saving = false;
        $scope.setPublishing = false;
        $scope.types = [
            { value : "HDB", text: "HDB" },
            { value : "LND", text: "Landed House" },
            { value : "CND", text: "Condo" }
        ];

        $scope.showStatus = function() {
            var selected = $filter('filter')($scope.types , { value : $scope.property.type });
            return ($scope.property.type && selected.length) ? selected[0].text : 'Not set';
        };

        $scope.removeImage = function(imagePosition) {
            $scope.slides.splice(imagePosition, 1);
            $scope.property.asset.images.splice(imagePosition, 1);
        };

        $scope.property.$promise.then(function(){
            angular.forEach($scope.property.asset.images, function(image){
                $scope.propertyHasImages = true;
                $scope.slides.push({ image : image, text : ''});
            });

            if(!$scope.propertyHasImages) {
                $scope.slides = [ { image : 'http://placehold.it/500x300?text=Sample+Image', text : ''} ];
            }

            $scope.removeRandomSlide = function (image) {
                //$scope.slides.shift();
                 $scope.slides.splice(image);
            };

            Helper.manageUploader($scope);
            $scope.loading = true ;
        });

        $scope.uploader = new FileUploader({
            url: apiUrl + '/api/properties/' + $stateParams.id + '/images.json',
            method : 'POST',
            autoUpload : true
        });

        //get Latitude & Longitude
        $scope.getLatLan = function($http){
            console.log($scope.property.zip);
            Geocode.getInformation($scope.property.zip).
                success(function(data){
                    console.log(data.results[0].geometry.location)
                }).
                error(function(data){
                    alert("Error");
                });
          //PropertyService.save($scope.property);
        };

        $scope.save = function(){
            PropertyService.save($scope.property);
        };

        $scope.save = function() {
            $scope.saving = true;
            $scope.property.$promise.then(function(){
                PropertyService.save($scope);
            });
        };

        $scope.publish = function(flag) {
            $scope.setPublishing = true;
            $scope.property.$promise.then(function(){
                $scope.property.published = flag;
                PropertyService.save($scope);
            });
        };

        $scope.setRemovable = function(index){
            $scope.mouseOn = index;
        };

        $scope.unsetRemovable = function(index){
            $scope.mouseOn = -1;
        };

        $scope.isRemoveable = function (index) {
            return $scope.mouseOn == index;
        }

    }]);

e2eApp.controller('PropertyController',['$scope', '$stateParams', 'PropertyService', function($scope, $stateParams, PropertyService){

    var id = $stateParams.id;
    $scope.myInterval = -1;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];

    $scope.property = PropertyService.get(id);

    $scope.slides = [
        {
            image : 'http://sg2-cdn.pgimgs.com/listing/13177735/UPHO.60324451.V550.jpg',
            text:''
        },
        {
            image: 'http://sg2-cdn.pgimgs.com/property/1411/PPHO.30070994.V550.jpg',
            text: ''
        },
        {
            image: 'http://sg2-cdn.pgimgs.com/property/1411/PPHO.30070998.V550.jpg',
            text : ''
        }
    ];

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
