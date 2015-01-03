angular.module('noteApp')
  .controller('homeCtrl', ['$scope', '$http', '$location', 'listNotes', 'bindEditor',
    function noteCtrl($scope, $http, $location, listNotes, bindEditor) {

      listNotes($scope);
      bindEditor('content');

      $scope.save = function() {
        var title = $scope.title;
        // var content = CKEDITOR.instances.content.getData();

        $http.post('/api/notes', { title: title, content: content })
          .success(function (note, status, headers, config) {
            $location.path('/notes/' + note.id);
          });
      }
  }])
;