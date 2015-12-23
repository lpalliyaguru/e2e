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
        }
    };
    return self;
});

e2eApp.service('PropertyService', function($q, Property){
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
        save: function($scope){
            console.log( $scope.property);
                return Property.update({id: $scope.property.id}, $scope.property, function () {
                    $scope.saving = false;
                    $scope.setPublishing = false;
                });
        }
    };
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