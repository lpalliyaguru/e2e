e2eApp.factory('User', function($resource){
    return $resource(apiUrl + '/api/user/:id/:action',
        {
            id : '@id'
        },
        {
            'update': {
                method : 'PUT'
            }
        }
        );
});

e2eApp.factory('Place', function($resource){
    return $resource(apiUrl + '/api/places/:id/:action',
        {
            id: '@id'
        },
        {
            'search': {
                method: 'GET',
                params: {
                    action: 'search',
                    query: '@query'
                }
            },
            'getPlaces':{
                method: 'GET',
                params:{
                    action: 'nearby',
                    longitude: '@longitude',
                    latitude: '@latitude',
                    propertyId: '@propertyId'
                }
            }
        });
});

e2eApp.factory('Property', function($resource){
    return $resource(apiUrl + '/api/properties/:id/:action',
        {
            id: '@id'
        },
        {
            'update': {
                method : 'PUT'
            },
            'search': {
                method: 'GET',
                params: {
                    action: 'search',
                    places: '@places',
                    rent:'@rent',
                    sale: '@sale'
                }
            }

        });
});

e2eApp.factory('Geocode',function($http){
    return {
        getInformation : function(zipcode){
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+zipCode+'&sensor=true';
            return $http.get(url);
        }
    }
});