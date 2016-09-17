var app = angular.module('myapp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log('hello entered');
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true)

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboards', {
        abstract: true,
        url: "/",
        templateUrl: "views/common/content.html",
    })

    .state('reset', {

        url: '/password_reset', // it is a simple steps to define the states of the html pages for angular routing
        templateUrl: 'views/resetpassword.html'
    });



});
