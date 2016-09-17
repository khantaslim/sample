'use strict';

angular.module('user')
    .factory('userService', ['$http', function($http) {
        return {
            getdata: function(data, callback, response) {

                // console.log('response');
                $http({
                    method: 'GET',
                    url: '/api/post/add?skip=' + data.skip + '&limit=' + data.limit + '&currentPage=' + data.currentPage
                }).then(function(response) {
                        callback(response);
                    },
                    function(response) {
                        callback(response);
                    });
            },


            updatedata: function(data, callback) {
                // console.log('response');

                $http.post('/api/updatepost/data1', data).then(
                    function(response) {
                        console.log('response', response);

                        callback(response);
                    },
                    function(response) {
                        callback(response);
                    });
            },


            delete: function(data, callback) {
                console.log('response');
                console.log(data);

                $http({
                    method: 'POST',
                    url: '/api/delete/category/id',
                    data

                }).then(
                    function(response) {
                        console.log('response', response);

                        callback(response);
                    },
                    function(response) {
                        callback(response);
                    });
            },

            // logoutuser: function(callback) {
            //     console.log('response');

            //     $http.post('/api/userlogout').then(
            //         function(response) {
            //             callback(response);
            //         },
            //         function(response) {
            //             callback(response);
            //         }
            //     );
            // },
        }




    }]);
