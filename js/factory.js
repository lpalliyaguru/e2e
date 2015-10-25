e2eApp.factory('Place', function($resource){
    return $resource('http://api.e2e.local/api/search/places.json');
});