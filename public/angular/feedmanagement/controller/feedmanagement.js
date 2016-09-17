'use strict';
//var app = angular.module('inspinia');
// app.factory('socket', function() {
//     var socket = io.connect('http://localhost:8000');
//     return socket;
// });

app.controller('FeedManagementCtrl', ['$scope', 'socket', '$http', '$rootScope', function($scope, socket, $http, $rootScope) {
    $scope.msgs = {};
    $scope.list = {};
    $rootScope.receiverId = null;

    $scope.getreciveid = function(id) {
       
        console.log("popup");
            //     $http.get('/api/getreciveid/id')
            //     .success(function() {
            //     $('#popup').modal('show');

            // })
            // .error(function(error) {
            //     console.log('Error', error);
            // });
        $rootScope.receiverId = id;

    }

    $scope.sendMsg = function(user, req) {
        socket.emit('send msg', { message: $scope.msg.text, user: $rootScope.loggedInUser, receiverId: $rootScope.receiverId });
        $scope.msg.text = '';


    };
    socket.on('user list', function(user) {
        console.log("chat show", user);
        $scope.allchatlist = user;
        socket.emit(user);
        // $scope.$digest();
    });
    socket.on('get old messages', function(docsCallback) {

        console.log(docsCallback);
        $scope.allMsgs = docsCallback;
        //$scope.$digest();

    });
    socket.on('get msg', function(data) {


        console.log(data);
        $scope.allMsgs.push(data);
        $scope.$digest();
    });

    getMessages();

    function getMessages() {
        console.log("getmessages");
        $http.get('/api/getmessages')
            .success(function(data) {
                $scope.allMsgs = data.data;

            })
            .error(function(error) {
                console.log('Error', error);
            });


    }







}]);
