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
            url:"/search?places&rent&sale",
            templateUrl: 'templates/search.html',
            controller: 'SearchController'

        });
        $urlRouterProvider.otherwise('/');
});



