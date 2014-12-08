var noteApp = angular.module('noteApp', []);

noteApp.controller('noteCtrl', ['$scope', '$http', '$sce', function noteCtrl($scope, $http, $sce) {

  $scope.init = function () {
    var options = {
      editor: document.querySelector('[data-toggle="pen"]'),
      debug: false
    };

    $scope.pen = window.pen = new Pen(options);
    $scope.pen.focus();

    $scope.toggleReadOnlyClass = 'btn-default';
    $scope.toggleMarkdownClass = 'btn-default';
    $scope.isReadOnly = false;
    $scope.showMarkdown = false;

    $http.get('/api/notes')
      .success(function (data, status, headers, config) {
        $scope.notes = data;
        console.log('success');
      })

  }

  $scope.save = function(e) {
    $http.post('/api/notes', { title: 'the first note', note: $scope.contentHtml })
      .success(function (data, status, headers, config) {})
      .error(function (data, status, headers, config) {});
  }

  $scope.toggleReadOnly = function(e) {
    $scope.isReadOnly = !$scope.isReadOnly;
    $scope.toggleClass($scope.isReadOnly, 'toggleReadOnlyClass');

    if ($scope.isReadOnly) {
      $scope.pen.destroy();
    } else {
      $scope.pen.rebuild();
    }
  }

  $scope.toggleMarkdown = function(e) {
    $scope.showMarkdown = !$scope.showMarkdown;
    $scope.toggleClass($scope.showMarkdown, 'toggleMarkdownClass');

    var pen = document.querySelector('.pen')
    if ($scope.showMarkdown) {
      pen.classList.add('hinted');
    } else {
      pen.classList.remove('hinted');
    }
  }

  $scope.toggleClass = function(value, classModel) {

    if (value) {
      $scope[classModel] = 'btn-primary';
    } else {
      $scope[classModel] = 'btn-default'
    }
  }

  $scope.init();

}]);
 
