angular.module('noteApp')
  .factory('listNotes', ['$http', function ($http) {
    return function (scope) {
      $http.get('/api/notes')
        .success(function (notes, status, headers, config) {
          scope.notes = notes;
      });      
    }
  }])
  .directive('noteSideBar', function () {
    return {
      templateUrl: '../html/directives/side-bar.html'
    }
  })
  .directive('noteNavigation', function () {
    return {
      templateUrl: '../html/directives/navigation.html'
    }
  })
  .directive('noteEntry', function () {
    return {
      templateUrl: '../html/directives/entry.html'
    }
  })
;
