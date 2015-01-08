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
  .directive('noteContent', function () {
    return {
      link: function () {
        $('#content').summernote({
          height: 250,
          minHeight: 250,
          focus: true
        });
      },
      templateUrl: '../html/directives/content.html'
    }
  })
;
