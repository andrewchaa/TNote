angular.module('noteApp')
  .controller('editCtrl', ['$scope', '$routeParams', '$http', '$location', 'listNotes', 'bindEditor',
    function ($scope, $routeParams, $http, $location, listNotes, bindEditor) {

      listNotes($scope);

      $http.get('/api/notes/' + $routeParams.id)
        .success(function (note, status, headers, config) {
          $scope.title = note.title;
          $scope.content = note.content;

          bindEditor();
          $('#content').code(note.content);
          $('#content').destroy();

      });

      $scope.new = function() {
        $location.path('/');
      }

      $scope.save = function() {
        var content = $('#content').code();
        $http.put('/api/notes/' + $routeParams.id, { title: $scope.title, content: content })
          .success(function (noteEntity) {
            $scope.title = noteEntity.title;
          });
      }

  }])
;