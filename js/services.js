e2eApp.service('placeService', function($q, Place){
    var self =  {
        places: [],
        loadPlaces : function(query){
            var deferred = $q.defer();
            deferred.resolve(self.places);

            Place.get({"keyword" : query }, function(data){
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