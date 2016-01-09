var e2eApp = angular.module('e2e',[
    'ngResource',
    'ngTagsInput',
    'ui.router',
    'uiGmapgoogle-maps',
    'ui.bootstrap',
    'angularFileUpload',
    'xeditable',
    'angular-ladda',
    'toastr'
]);
    /*.directive('loading', function () {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        }
    });*/

e2eApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

e2eApp.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, laddaProvider, toastrConfig){

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    laddaProvider.setOption({
        style: 'expand-left'
    });
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        closeButton: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
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
        .state('login', {
            url : '/login',
            templateUrl : 'templates/login.html',
            controller: 'LoginController'
        })
        .state('register',{
            url : '/register',
            templateUrl : 'templates/register.html',
            controller: 'RegisterController'
        })

    ;

    $urlRouterProvider.otherwise('/');
});



