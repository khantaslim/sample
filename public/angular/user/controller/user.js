'use strict';
angular.module('user', [])
    .controller('UserCtrl', ['$scope', 'userService', '$state', '$http', function($scope, userService, $state, $http) {
        $scope.itemsPerPage = 2;
        $scope.total = 0;
        $scope.pagination = {
            currentPage: 1,
            skip: 0,
            limit: 2
        }
        $scope.getdata = function(add) {
            // console.log('called');
            //console.log('$scope.pagination', $scope.pagination);
            userService.getdata($scope.pagination, function(response) {

                $scope.adddata = response.data.data;
                console.log('response', $scope.adddata);
                console.log('response', response.data.count);
                $scope.total = response.data.count;


            });

        }
        $scope.nextPage = function() {
            $scope.pagination.currentPage++
                $scope.pagination.skip += 2;

            $scope.getdata();

        };
        $scope.islast = false;
        $scope.nextPageDisabled = function() {
            if ($scope.pagination.currentPage == Math.ceil($scope.total / $scope.itemsPerPage)) {
                $scope.islast = true;
            } else {
                $scope.islast = false;
            }
        }



        $scope.prevPage = function() {

            $scope.pagination.currentPage--
                $scope.pagination.skip -= 2;
            $scope.getdata();

        }
        $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
        }

        $scope.pageCount = function() {
            //console.log("array", $scope.total);

            //console.log("page", $scope.itemsPerPage);
            // if (err) {

            //     return next(err);
            // } else {

            return new Array(Math.ceil($scope.total / $scope.itemsPerPage));
            //}
        }
        $scope.setPage = function(n) {
            $scope.pagination.skip = ((n - 1) * ($scope.pagination.limit));

            console.log("skip", $scope.pagination.skip, n);
            // if (n > 0 && n < $scope.pageCount()) {
            $scope.pagination.currentPage = n;
            $scope.getdata();
            if (n == Math.ceil($scope.total / $scope.itemsPerPage)) {
                $scope.islast = true;
            } else {
                $scope.islast = false;
            }

            // }
        }




        $scope.edit = function(add) {


            $('#myModal').modal('show');
            $scope.data = add;
            console.log($scope.data);



        }


        $scope.update = function(data) {


            console.log('body.data', data);
            var fd = new FormData();
            fd.append('file', $("#imageedit")[0].files[0]);
            console.log(fd);
            var url = "/api/updatepost/?category=" + data.category + "&title=" + data.title + "&description=" + data.description + "&id=" + data._id;
            $http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                .success(function(response) {
                    console.log(response);
                    if (response && response.success && response.data) {
                        console.log('success', 'Success', response.message);
                        $scope.image = response.image;
                        // $state.go('user.user');

                    } else {
                        console.log('error', 'Error', response.message);
                    }
                });
            $scope.getdata();



        }



        // $scope.update = function(data) {

        //     // console.log('body.data1', data1);


        //     userService.updatedata(data, function(response) {
        //         console.log('response', response.data);

        //         $scope.updatepost = response.data;
        //         //     // refresh();


        //     });
        // };
        $scope.delete = function(data) {
            console.log('remove called');
            console.log("your id:-", data);
            userService.delete({         id: data,        }, function(response) {
                console.log('response', response.data);

                // $scope.removepost = response.cat.cat;

                //$scope.removepost = {};
                $scope.getdata();


            });
        };

        // $scope.logout = function() {
        //     console.log('logout');

        //     userService.logoutuser(function(response) {
        //         console.log('response', response);

        //         if (response.data.authenticated == false) {
        //             $scope.successTextAlert = "logout successfull";
        //             $state.go('login');
        //         } else {

        //             alert('user not logout ');
        //             console.log('error');
        //         }



        //     });
        // };






    }]);
