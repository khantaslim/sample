/**
 * INSPINIA - Responsive Admin Theme
 *
 */
angular.module('inspinia', [
    'user',
    'auth',
    'category',
    'events',
    'feedmanagement',
    'ui.router', // Routing
    'oc.lazyLoad', // ocLazyLoad
    'ui.bootstrap', // Ui Bootstrap
    'pascalprecht.translate', // Angular Translate
    'ngIdle', // Idle timer
    'ngSanitize' // ngSanitize
]).
config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
        // Configure Idle settings
        IdleProvider.idle(5); // in seconds
        IdleProvider.timeout(120); // in seconds

        //$urlRouterProvider.otherwise("/");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        $stateProvider
            .state('home', {
                // url: "/",

                templateUrl: 'views/dashboard.html'
            })
            .state('dashboards', {
                abstract: true,
                url: "/",
                templateUrl: "views/common/content.html",
            })
            .state('dashboards.event_1', {
                url: "events",
                controller: "EventsCtrl",
                templateUrl: "/angular/events/views/event_1.html"
            })

        .state('dashboards.event_2', {
                url: "event_1",
                controller: "EventsCtrl",
                templateUrl: "/angular/events/views/event_2.html"
            })
            .state('category', {
                abstract: true,
                url: "/",
                templateUrl: "views/common/content.html",
            })
            .state('category.category', {
                url: "category",
                controller: "CategoryCtrl",
                templateUrl: "/angular/category/views/category.html"
            })
            .state('user', {
                abstract: true,
                url: "/",
                templateUrl: "views/common/content.html",
            })
            .state('user.user', {
                url: "user",
                controller: "UserCtrl",
                templateUrl: "/angular/user/views/user.html"
            })
            .state('feedmanagement', {
                abstract: true,
                url: "/",
                templateUrl: "views/common/content.html",
            })
            .state('feedmanagement.feedmanagement', {
                url: "feedmanagement",
                controller: "FeedManagementCtrl",
                templateUrl: "/angular/feedmanagement/views/feedmanagement.html"
            })
            .state('login', {
                url: "/",
                templateUrl: "views/login.html"
            })
            .state('forgotpassword', {
                url: "/forgotpassword",
                templateUrl: "views/forgot.html"
            })
            .state('Resetpassword', {
                url: "/resetpassword",
                templateUrl: "views/resetpassword.html"
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    })
    // .run(['$rootScope', '$http', function($http, $rootScope) {
    //     console.log('Run called');
    //     $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //         //console.log("I am state", toState, toParams, fromState, fromParams);
    //         $http.get('/api/userexist').
    //         then(function(res) {
    //             console.log(toState.name, 'toState', res.data.success);
    //             if (res.data.success == true && toState.name === 'login') {
    //                 window.location.href = '/category'
    //             }

//             if (res.data.success == false && toState.name !== 'login') {
//                 window.location.href = '/login'
//                 console.log('Inside if');
//             }
//         });




//     });
// }]);
.run(function($http, $rootScope) {
    console.log('Run called');

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $http.get('/api/userexist').
            then(function(res) {
                console.log(toState.name, 'toState', res.data.success, res.data.user);
                if (res.data.success == true && toState.name === 'login') {
                    window.location.href = '/category'
                }
                if (res.data.success) {
                    $rootScope.loggedInUser = res.data.user;
                }
                if (res.data.success == false && toState.name !== 'login') {
                    window.location.href = '/login'
                    console.log('Inside if');
                }

            });
        });


});
