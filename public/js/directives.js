angular.module('noteApp')
  .factory('listNotes', ['$http', function ($http) {
    return function (scope) {
      $http.get('/api/notes')
        .success(function (notes, status, headers, config) {
          scope.notes = notes;
      });      
    }
  }])
  .directive('noteNavigation', function () {
    return {
      templateUrl: '../html/directives/navigation.html'
    }
  })
;
