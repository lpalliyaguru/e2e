e2eApp.factory('Place', function($resource){
    return $resource('http://api.e2e.local/api/places/:id/:action',
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
    return $resource('http://api.e2e.local/api/properties/:id/:action',
        {
            id: '@id'
        },
        {
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