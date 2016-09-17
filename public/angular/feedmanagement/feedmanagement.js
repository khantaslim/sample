'use strict';

 var app= angular.module('feedmanagement', []);
//var app = angular.module('feedmanagement', ['$http',function($http){
app.factory('socket', function() {
    var socket = io.connect('http://localhost:8000');
    return socket;
});




