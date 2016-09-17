'use strict';

angular.module('auth')
    .factory('authService', ['$http', function($http) {
        return {
            saveUser: function(data, callback) {

                $http.post('/api/post/data', data.usersdata).then(

                    function(response) {
                        console.log('response', response);
                        callback(response);

                    },
                    function(response) {
                        callback(response);
                    }
                );
            },
            loginUser: function(logindetail, callback) {
                console.log(logindetail.usersdata);

                $http.post('/api/logindetail', logindetail.usersdata).then(
                    function(response) {
                        callback(response);
                    },
                    function(response) {
                        callback(response);
                    }
                );
            },

            forgotsave: function(got, callback) {
                console.log(got.usersdata);

                $http.post('/api/forgot', got.usersdata).then(
                    function(response) {
                        callback(response);
                    },

                    function(response) {
                        callback(response);
                    }

                );
            },



   logoutuser: function(callback) {
                console.log('response');

                $http.post('/api/userlogout').then(
                    function(response) {
                        callback(response);
                    },
                    function(response) {
                        callback(response);
                    }
                );
            },







        }


    }]);
