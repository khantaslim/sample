'use strict';
angular.module('events', [])
.controller('EventsCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  
	$scope.eventcollection = [];
    //$scope.$watch(
/*        $scope.firebasess = function(){
        var database = firebase.database();
        console.log(database);
        firebase.database().ref('events/').on('value', function(snapshot) {
          $scope.items = snapshot.val();
          angular.forEach($scope.items, function(value, key) {
               
                  var val = {key: key, data: value};
                  $scope.eventcollection.push(val);
               
          });
          
           console.log($scope.eventcollection);
        });
        firebase.auth().signInWithEmailAndPassword('jitendrashakya777@gmail.com', 'linkites').then(function(d) {
           console.log(d);
        }, function(error) {
      }); 
    };
    //);
    
    $scope.firebasess();*/

}]);