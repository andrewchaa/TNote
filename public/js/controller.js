var noteApp = angular.module('noteApp', ['ngSanitize']);

noteApp.controller('noteCtrl', ['$scope', '$http', '$sce', function noteCtrl($scope, $http, $sce) {
    $http.get('/js/data.html').success(function(data) {
        $scope.contentHtml = data;
    });
    // $scope.contentHtml = function() {
        // return $sce.trustAsHtml(
        // return 'test';
    // }

    // $scope.contentHtml = 'test';
    $scope.clickMe = function(e) {
        console.log(e);
    }
}]);
 
