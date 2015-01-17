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
      // link: function (scope, element, attr) {
      //   var height = $(window).height() - 450;
      //   $('#content').summernote({
      //     height: height,
      //     minHeight: 250
      //   });
      // },

      templateUrl: '../html/directives/content.html'
    }
  })
;
