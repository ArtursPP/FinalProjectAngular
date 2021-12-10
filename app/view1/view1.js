'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', function ($scope, $httpClient, $timeout) {



        $scope.getAccountById = function () {
            console.log($scope.accountIdField);
            console.log("http://localhost:8080/api/rest/Account.svc/account(" +$scope.accountIdField+ ")");

            $httpClient.get("http://localhost:8080/api/rest/Account.svc/account(" +$scope.accountIdField+ ")")
                .then(function (response) {
                    console.log(response);
                    if(response.data.error === true){
                        console.log("IN BLOCK: " + response)
                        document.getElementById("errorMsgDiv").style.display='block';
                        console.log("We want print: "+response.data.message);
                        document.getElementById("errorMsgDiv").innerHTML = response.data.message;
                        document.getElementById('accountDataTable').style.display='none';
                    } else {
                        document.getElementById("errorMsgDiv").style.display='none';
                        document.getElementById('accountDataTable').style.display='block';

                        $scope.accResponse = response.data;
                        console.log($scope.accResponse.cardDTOs);
                    }


                }).catch(function (error) {
                console.log(error);
            });


        }

    }]);