var e2eApp = angular.module('e2e',[
    'ngResource',
    'ngTagsInput',
    'ui.router',
    'uiGmapgoogle-maps',
    'ui.bootstrap'
]);

e2eApp.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

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

        })
        .state('property', {
            url:"/property/:id",
            templateUrl: 'templates/property.html',
            controller: 'PropertyController'
        });;

        $urlRouterProvider.otherwise('/');
});



