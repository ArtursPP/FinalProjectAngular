'use strict';


angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', '$http', '$location', function ($scope, $httpClient, $location) {

        $scope.login = function () {

            $httpClient.get("http://localhost:8080/api/rest/Auth.svc/" + $scope.username + "/" + $scope.password)
                .then(function (response) {
                    if (response.data != null && response.data.error === true) {
                        alert(response.data.message);
                    } else {
                        alert('Login, Ok');
                        $location.path('/view1');

                    }
                }).catch(function (error) {
                console.log(error);
            });
        }


    }]);
