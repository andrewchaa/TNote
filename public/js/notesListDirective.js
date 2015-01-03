angular.module('noteApp')
  .factory('listNotes', ['$http', function ($http) {
    return function (scope) {
      $http.get('/api/notes')
        .success(function (notes, status, headers, config) {
          scope.notes = notes;
      });      
    }
  }])
  .directive('notesList', function () {
    return {
      templateUrl: '../html/notes-list.html'
    }
  })
;
