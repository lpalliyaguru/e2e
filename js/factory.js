e2eApp.factory('User', function($resource){
    return $resource(apiUrl + '/api/users/:username/:action',
        {
            username: '@username'
        },
        {
            'search': {
                method: 'GET',
                params: {
                    action: 'search',
                    query: '@query'
                }
            }
        });
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