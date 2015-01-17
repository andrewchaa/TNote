angular.module('noteApp').controller('homeCtrl', ['$scope', '$http', '$location', 'listNotes', 'noteEditor',
    function homeCtrl($scope, $http, $location, listNotes, noteEditor) {

      listNotes($scope);

      $scope.save = function() {
        $scope.isSaving = true;

        var title = $scope.title;
        var content = $('#content').code();

        $http.post('/api/notes', { title: title, content: content })
          .success(function (note, status, headers, config) {
            $location.path('/' + note.id);
        });

        $scope.isSaving = false;
      }
  }])
;