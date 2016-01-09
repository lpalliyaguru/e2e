e2eApp.service('PlaceService', function($q, Place){
    var self =  {
        places: [],
        loadPlaces : function(query){
            var deferred = $q.defer();
            deferred.resolve(self.places);

            Place.search({"query" : query}, function(data){
                self.places = [];
                angular.forEach(data.data, function(place){
                    self.places.push({
                        "id" : place.id,
                        "text" : place.name
                    });
                });
            });
            return deferred.promise;
        },
        getPlaces : function(coords){
            return Place.getPlaces({longitude: coords.longitude, latitude: coords.latitude}, function (nearbyPlaces) {
            });
        }
    };
    return self;
});

e2eApp.service('PropertyService', function($q, Property, toastr){
    var self =  {
        props: [],
        get: function (id) {
            return Property.get({
                "id" : id
            });
        },
        loadProps: function(places, rent,sale){

            return Property.search(
                {
                    "places" : places,
                    "rent": rent,
                    "sale": sale
                }
            );
        },
        create: function () {
            var property = {
              name : 'Sample Name'
            };
            return Property.save(property, function(d){
                console.log('saved property', d);
            });
        },
        save: function($scope){
            return Property.update({id: $scope.property.id}, $scope.property, function (d) {
                $scope.saving = false;
                $scope.setPublishing = false;
                toastr.success('Property posting updated');
            }, function() {
                $scope.saving = false;
                $scope.setPublishing = false;
                toastr.error('Something went wrong. Please try again');
            });
        },
        addMarkerToMap : function($scope, coords){
            var bound = new google.maps.LatLngBounds();
            var marker = {
                id: 1,
                hashId : 'PROPERTYA123',
                coords: coords,
                options: {
                    name: $scope.property.name,
                    cover_image : '/images/properties/1.jpg'//prop.cover_image
                },
                show : false
            };
            $scope.markers.push(marker);
            bound.extend( new google.maps.LatLng(coords.latitude, coords.longitude));
            bound.zoom;
            $scope.map.center =  { latitude: bound.getCenter().lat(), longitude: bound.getCenter().lng() };//bound.getCenter();
            $scope.map.control.refresh(coords);
        }
    };
    return self;
});

e2eApp.service('UserService', function($q, User){

    var self = {
        get : function(username){
            return User.get({
                "username" : username
            });
        }
    }
    return self;
});

e2eApp.service('HelperService', function(){
    var parts = [];
    var self = {
        rebuildPlacesArray : function(places){
            var placeList = [];
            angular.forEach(places, function(placeStr){
                parts = placeStr.split(':');
                placeList.push({id: parts[0], text: parts[1]});
            });
            return placeList;
        }
    };

    return self;
});