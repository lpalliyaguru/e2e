var e2eApp = angular.module('e2e',[
    'ngResource',
    'ngTagsInput',
    'ui.router',
    'uiGmapgoogle-maps',
    'ui.bootstrap',
    'angularFileUpload'
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
            url:"/property/v/:id",
            templateUrl: 'templates/property.html',
            controller: 'PropertyController'
        })
        .state('propertyAdd', {
            url:"/property/a",
            templateUrl: 'templates/property.add.html',
            controller: 'PropertyAddController'
        })
        .state('propertyEdit', {
            url:"/property/e/:id",
            templateUrl: 'templates/property.edit.html',
            controller: 'PropertyEditController'
        })
    ;

        $urlRouterProvider.otherwise('/');
});



