var noteApp = angular.module('noteApp', ['ngSanitize']);

noteApp.controller('noteCtrl', ['$scope', '$http', '$sce', function noteCtrl($scope, $http, $sce) {
    $http.get('/js/data.html').success(function(data) {
        $scope.contentHtml = data;
    });

    $scope.clickMe = function(e) {
        console.log(e);
        $http.post('note', { title: 'the first note', note: $scope.contentHtml }).
            success(function (data, status, hearders, config) {
                console.log(status);
            }).
            error(function (data, status, headers, config) {

            });

    }
}]);
 
