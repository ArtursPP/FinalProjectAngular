'use strict';



angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', '$timeout', function ($scope, $httpClient, $timeout) {

        $scope.saveNewAccount = function () {


            if (!$scope.checkbox) {
                alert("Please agree with terms")
            } else {
                if($scope.account_number < 21){
                    alert("Account number should be 21 symbols");
                    return;
                }
                let accountDTO = {
                    account_number: $scope.accountNumber,
                    currency: $scope.currency,
                    ballance: $scope.ballance
                }
                let createAccountJSON = JSON.stringify(accountDTO);

                document.getElementById("error").style.display = 'none';

                console.log($httpClient);

                $httpClient.post("http://localhost:8080/api/rest/Account.svc/account", createAccountJSON)
                    .then(function (response) {
                        if (response.data.error != null) {
                            console.log("ERROR");
                            document.getElementById("error").style.display = 'block';
                            document.getElementById("error").innerHTML = response.data.message;
                        }
                        console.log(response);
                    }).catch(function (error){
                    document.getElementById("error").style.display = 'block';
                    document.getElementById("error").innerHTML = response.data.message;
                    console.log(error);
                });

            }
        }


    }]);
