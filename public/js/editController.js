angular.module('noteApp')
  .controller('editCtrl', ['$scope', '$routeParams', '$http', '$location', 'listNotes', 'noteEditor', 
    function ($scope, $routeParams, $http, $location, listNotes, noteEditor) {

      listNotes($scope);
      $scope.isView = true;
      $scope.buttonText = 'View';

      $http.get('/api/notes/' + $routeParams.id)
        .success(function (note, status, headers, config) {
          $scope.title = note.title;
          $scope.content = note.content;
      });

      $scope.edit = function () {
        $scope.isView = false;
        $scope.isEdit = true;

        noteEditor.show();
      }

      $scope.view = function () {
        $scope.isView = true;
        $scope.isEdit = false;

        noteEditor.hide();
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