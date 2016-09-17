'use strict';
angular.module('auth', [])

.controller('AuthCtrl', ['$rootScope', '$scope', 'authService', '$state', function($rootScope, $scope, authService, $state) {
    $scope.facebook = function() {
        window.location.href = "/auth/facebook";
    }

    $scope.twitter = function() {
        window.location.href = "/auth/twitter";
    }
    $scope.google = function() {
        window.location.href = "/auth/google";
    }

    $scope.submit = function(data) {
        authService.saveUser({
                usersdata: data
            },


            function(response) {
                // console.log('response', response.data);
                if (response && response.data) {
                    console.log(response);
                    $("#myModal").modal("hide");
                } else {
                    console.log('error');
                }


            });
    }

    $scope.login = function(logindetail) {
        // console.log("gghvhjv", logindetail);


        authService.loginUser({
                usersdata: logindetail
            },

            function(response, error, next) {
                console.log('response', response.data);
                if (response.data.success == true) {
                    $scope.successTextAlert = "login successfull";
                    $scope.showSuccessAlert = true;

                    $state.go('category.category');




                } else {

                    alert('invalid email and password');
                    console.log('error');
                }
            });

    }


    $scope.forgot = function(got) {
        console.log("called", got);
        authService.forgotsave({
                usersdata: got

            },
            function(response, error, next) {
                console.log('response', response.data);
                if (response && response.data) {

                    console.log(response);



                } else {

                    console.log('error');
                }
            });
    }

    // $scope.Update = function(pa) {
    //     console.log("called", pa);
    //     authService.entersave({
    //             usersdata: pa

    //         },
    //         function(response, error, next) {
    //             console.log('response', response.data);
    //             if (response && response.data) {

    //                 console.log(response);



    //             } else {

    //                 console.log('error');
    //             }
    //         });


    // }

 $scope.logout = function() {
            console.log('logout');

            authService.logoutuser(function(response) {
                console.log('response', response);

                if (response.data.authenticated == false) {
                    $scope.successTextAlert = "logout successfull";
                    $state.go('login');
                } else {

                    alert('user not logout ');
                    console.log('error');
                }



            });
        };


}]);
