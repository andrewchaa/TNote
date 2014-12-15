noteApp = angular.module('noteApp', ['ngRoute'])
  .constant('VERSION', '0.1')
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/', {
        controller: 'homeCtrl',
        templateUrl: '../html/home.html'
      })
      .when('/:id', {
        controller: 'editCtrl',
        templateUrl: '../html/home.html'
      });
    }
  ])
  .controller('homeCtrl', ['$scope', '$http', function noteCtrl($scope, $http) {

    $scope.title = '';
    $scope.init = function () {

      $http.get('/api/notes')
        .success(function (data, status, headers, config) {
          $scope.notes = data;
        })


      CKEDITOR.disableAutoInline = true;

      var config = {
        extraPlugins: 'codesnippet',
        toolbar: [
          [ 'Source' ], [ 'Undo', 'Redo' ], [ 'Bold', 'Italic', 'Underline' ], [ 'CodeSnippet' ]
        ],
        codeSnippet_theme: 'default',
        height: 400
      };

      CKEDITOR.replace( 'content', config );

      CKEDITOR.inline( 'editable', CKEDITOR.tools.extend( {}, config, {
        extraPlugins: 'codesnippet'
      }, true ) );

      if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 )
        CKEDITOR.document.getById( 'ie8-warning' ).addClass( 'warning' );
    }

    $scope.new = function () {
      console.log('new');
    }

    $scope.save = function(e) {
      $http.post('/api/notes', { title: $scope.title, note: $scope.contentHtml })
        .success(function (data, status, headers, config) {})
        .error(function (data, status, headers, config) {});
    }

    $scope.init();

  }])
  .controller('editCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.init = function () {
      $http.get('/api/notes/' + $routeParams.id)
        .success(function (data, status, headers, config) {
          console.log(data.note);
        })
    }

    $scope.init();
  }])
;
 
