app
    .factory('myservice', ['$http', function($http) {
        return {
            entersave: function(data, callback) {

                $http.post('/password_reset', data).then(
                    function(response) {
                        callback(response);
                    },

                    function(response) {
                        callback(response);
                    }

                );

            }
        }


    }]);
