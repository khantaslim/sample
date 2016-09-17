app.controller('myctrl', ['$scope', 'myservice', function($scope, myservice) {



    $scope.Update = function(pa) {
        console.log("called", pa);
        var url = window.location.href;
        var splitUrl = url.split('=');
        var token = splitUrl[1];
        console.log(splitUrl[1]);
        myservice.entersave({
                token: token,
                usersdata: pa

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
}]);
