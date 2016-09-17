'use strict';
angular.module('category', [])

.controller('CategoryCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.addPost = function(add) {
        var fd = new FormData();
        fd.append('file', $("#image")[0].files[0]);
        var url = "/api/postdetail/?category=" + add.category + "&title=" + add.title + "&description=" + add.description;
        $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function(response) {
                console.log(response);
                if (response && response.success && response.data) {
                    console.log('success', 'Success', response.message);
                    $scope.image = response.image;
                    $state.go('user.user');
                } else {
                    console.log('error', 'Error', response.message);
                }
            });
    }

    // $scope.logout = function() {
    //     console.log('logout');

    //     catService.logoutuser(function(response) {
    //         console.log('response', response);

    //         // if (response.data.authenticated == false) {
    //         //     $scope.successTextAlert = "logout successfull";
    //         //     $state.go('login');
    //         // } else {

    //         //     alert('user not logout ');
    //         //     console.log('error');
    //         // }


    //     });
    // }

    // $scope.addPost = function(add) {
    //     catService.addcategory({
    //             adddata: add
    //         },

    //         function(response) {
    //             console.log('response', response.data);
    //             $state.go('user.user');
    //         });
    // }







}]);
