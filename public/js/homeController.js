angular.module('noteApp')
  .controller('homeCtrl', ['$scope', '$http', '$location', 'listNotes', 'bindEditor',
    function noteCtrl($scope, $http, $location, listNotes, bindEditor) {

      listNotes($scope);

      $scope.save = function() {
        var title = $scope.title;
        var content = $('#summernote').code();

        console.log('content: ' + content);        

        $http.post('/api/notes', { title: title, content: content })
          .success(function (note, status, headers, config) {
            $location.path('/' + note.id);
        });
      }

  }])
;