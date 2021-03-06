'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', function ($scope, $httpClient, $timeout) {

        $scope.removeCardFromAccount = function (id) {
            console.log(id);
            $httpClient.put("http://localhost:8080/api/rest/Account.svc/remove(" + id + ")")
                .then(function (response) {
                    alert("Card with id: " + id + " removed");

                    var index = 0;
                    angular.forEach($scope.accResponse.cardDTOs, function (value) {
                        if (value.id !=null && value.id == id) {
                            $scope.accResponse.cardDTOs.splice(index, 1);
                        }
                        index++;
                    });
                }).catch(function (error) {
                console.log(error)
            })
        }


        $scope.getAccountById = function () {
            console.log($scope.accountIdField);
            console.log("http://localhost:8080/api/rest/Account.svc/account(" + $scope.accountIdField + ")");

            $httpClient.get("http://localhost:8080/api/rest/Account.svc/account(" + $scope.accountIdField + ")")
                .then(function (response) {

                    $scope.accountId = '';
                    $scope.accountNumber = '';
                    $scope.ballance = '';
                    $scope.currency = '';

                    console.log(response);
                    if (response.data.error === true) {
                        console.log("IN BLOCK: " + response)
                        document.getElementById("errorMsgDiv").style.display = 'block';
                        console.log("We want print: " + response.data.message);
                        document.getElementById("errorMsgDiv").innerHTML = response.data.message;
                        document.getElementById('accountDataTable').style.display = 'none';
                    } else {
                        document.getElementById("errorMsgDiv").style.display = 'none';
                        document.getElementById('accountDataTable').style.display = 'block';

                        $scope.accResponse = response.data;
                        console.log($scope.accResponse.cardDTOs);

                        $scope.accountId = response.data.id;
                        $scope.accountNumber = response.data.account_number;
                        $scope.ballance = response.data.ballance;
                        $scope.currency = response.data.currency;
                    }


                }).catch(function (error) {
                console.log(error);
            });


        }
        $scope.updateAccount = function () {
            let accountDTO = {
                id: $scope.accountId,
                account_number: $scope.accountNumber,
                currency: $scope.currency,
                ballance: $scope.ballance
            }
            let createAccountJSON = JSON.stringify(accountDTO);
            $httpClient.put("http://localhost:8080/api/rest/Account.svc/account", createAccountJSON)
                .then(function (response) {
                    alert("Account updated")
                }).catch(function (error) {

                console.log(error);
            });


        }
    }]);