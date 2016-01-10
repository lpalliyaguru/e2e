e2eApp.controller('PropertyAddController', ['$scope', function ($scope) {
}]);

e2eApp.controller(
    'RegisterController',
    ['$scope','UserService',
    function($scope, UserService){
        $scope.user = {};
        $scope.registering = false;
        $scope.register = function(){
            $scope.registering = true;
            UserService.register($scope);
        }

    }]
);

e2eApp.controller('NavigationController', function($scope, $rootScope, $sessionStorage) {
    $scope.$storage = $sessionStorage;
    $scope.tree = [
        {
            name: "Profile",
            link: "/#/profile",
        },
        {
            name: "Logout",
            link: "/#/logout",
        }
    ];
    /*$scope.tree = [{
        name: "States",
        link: "#",
        subtree: [{
            name: "state 1",
            link: "state1",
            subtree: [{name: "state 1",
                link: "state1"}]
        }, {
            name: "state 2",
            link: "state2"
        }]
    }, {
        name: "No states",
        link: "#",
        subtree: [{
            name: "no state connected",
            link: "#"
        }]
    }, {
        name: "divider",
        link: "#"

    }, {
        name: "State has not been set up",
        link: "#"
    }, {
        name: "divider",
        link: "#"
    }, {
        name: "Here again no state set up",
        link: "#"
    }];*/
});
e2eApp.controller(
    'LoginController',
    ['$scope', 'UserService', '$sessionStorage',
    function ($scope, UserService, $sessionStorage) {
        $scope.logging  = false;
        $scope.$storage = $sessionStorage;
        $scope.login = function()
        {
            UserService.login($scope);
        }
    }]
);

e2eApp.controller(
    'PropertyEditController',
    ['$scope', '$stateParams', '$filter', 'PropertyService','FileUploader', 'Helper', 'Geocode','toastr', function ($scope, $stateParams, $filter, PropertyService, FileUploader, Helper, Geocode, toastr) {
        $scope.propertyHasImages = false;
        $scope.slides = [];
        $scope.property = PropertyService.get($stateParams.id);
        $scope.uploading = false;
        $scope.mouseOn = -1;
        $scope.saving = false;
        $scope.markers = [];
        $scope.setPublishing = false;
        $scope.types = [
            { value : "HDB", text: "HDB" },
            { value : "LND", text: "Landed House" },
            { value : "CND", text: "Condo" }
        ];

        $scope.map = {
            center: { latitude: 1.434832, longitude: 103.796258 },
            zoom: 15,
            control: {},
            options: {}
        };

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
                 $scope.slides.splice(image);
            };

            Helper.manageUploader($scope);

            if($scope.property.location.coordinates) {
                PropertyService.addMarkerToMap($scope, { latitude : $scope.property.location.coordinates[1], longitude:$scope.property.location.coordinates[0] });
            }

            $scope.loading = true ;
        });

        $scope.uploader = new FileUploader({
            url: apiUrl + '/api/properties/' + $stateParams.id + '/images.json',
            method : 'POST',
            autoUpload : true
        });

        $scope.getLatLng = function(){
            geocoder = new google.maps.Geocoder();
            var bound = new google.maps.LatLngBounds();
            geocoder.geocode({ 'address' : $scope.getAddressPrepared() },
                function (results, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        var coords = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
                        PropertyService.addMarkerToMap($scope, coords);
                        $scope.property.location.coordinates = [coords.longitude, coords.latitude]
                    }
                    if(status != google.maps.GeocoderStatus.OK || results.length < 1) {
                        toastr.warning('We cannot find the place you entered. Please try again');
                    }
                });
        };

        $scope.getAddressPrepared = function () {
            var address = [];

            if ($scope.property.address != '') {
                address.push($scope.property.address);
            }
            if($scope.property.zip) {
                address.push($scope.property.zip);
            }
            return address.join(', ');
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
    $scope.markers = [], $scope.slides = [];
    $scope.map = {
        center: { latitude: 1.434832, longitude: 103.796258 },
        zoom: 15,
        control: {},
        options: {}
    };
    $scope.property = PropertyService.get(id);
    $scope.property.$promise.then(function(){
        angular.forEach($scope.property.asset.images, function(image){
            $scope.propertyHasImages = true;
            $scope.slides.push({ image : image, text : ''});
        });

        if(!$scope.propertyHasImages) {
            $scope.slides = [ { image : 'http://placehold.it/500x300?text=Sample+Image', text : ''} ];
        }
        console.log();
        if($scope.property.location.coordinates) {
            PropertyService.addMarkerToMap($scope, { latitude : $scope.property.location.coordinates[1], longitude:$scope.property.location.coordinates[0] });
        }
    });

}]);

e2eApp.controller("HomeController",
    ['$scope', '$q', 'PlaceService', '$state', 'UserService', 'PropertyService',
    function ($scope, $q, PlaceService, $state, UserService, PropertyService) {

    $scope.places = [];
    $scope.sale = false;
    $scope.rent = false;
    $scope.checkingPropertyExist = false;

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
        $state.go('search', query, {location: true});
    };

    $scope.checkEditableProperty = function()
    {

        $scope.checkingPropertyExist = true;

        $scope.user = UserService.get('lpalliyaguru');
        $scope.user.$promise.then(function () {
            $scope.checkingPropertyExist = false;
            //here need to check how many incomplete postings does user pocesses.
            if($scope.user.properties.length == 0) {
                $scope.createPosting();
            }
        });
    }

    $scope.createPosting = function (){
        $scope.property = PropertyService.create();
        var id =  $scope.property.id
        $scope.property.$promise.then(function(){
            $state.go('propertyEdit', { "id" :  $scope.property.id }, {location: true});
        });
    };

}]);

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
