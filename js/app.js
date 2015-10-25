var e2eApp = angular.module('e2e',[
    'ngResource',
    'ngTagsInput',
    'ui.router'
]);

e2eApp.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home', {
            url:"/",
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .state('search', {
            url:"/search",
            templateUrl: 'templates/search.html',
            controller: 'SearchController'

        });
        $urlRouterProvider.otherwise('/');
});

e2eApp.factory('Place', function($resource){
    return $resource('http://api.e2e.local/api/search/places.json');
});

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

e2eApp.controller("HomeController", function ($scope, $q, placeService) {

    $scope.tags = [];
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
        placeService.loadPlaces(query).then(function(){
            defer.resolve(placeService.places);
        });
        return defer.promise;
    };

    $scope.doSearch = function(){

        console.log($scope.rent, $scope.sale);
        return false;
    }
});

e2eApp.controller("SearchController", function ($scope) {


});



