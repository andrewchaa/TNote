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

  .controller('homeCtrl', ['$scope', '$http', '$location', function noteCtrl($scope, $http, $location) {

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

    CKEDITOR.inline( 'content', CKEDITOR.tools.extend( {}, config, {
      extraPlugins: 'codesnippet'
    }, true ) );

    if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
      CKEDITOR.document.getById( 'ie8-warning' ).addClass( 'warning' );
    }

    $scope.save = function(e) {
      var title = $scope.title;
      var content = CKEDITOR.instances.content.getData();

      $http.post('/api/notes', { title: title, note: content })
        .success(function (note, status, headers, config) {
          $location.path('/' + note.id);
        });
    }


  }])

  .controller('editCtrl', ['$scope', '$routeParams', '$http', '$location', 
    function ($scope, $routeParams, $http, $location) {

      CKEDITOR.disableAutoInline = true;

      var config = {
        extraPlugins: 'codesnippet',
        toolbar: [
          [ 'Source' ], [ 'Undo', 'Redo' ], [ 'Bold', 'Italic', 'Underline' ], [ 'CodeSnippet' ]
        ],
        codeSnippet_theme: 'default',
        height: 400
      };

      CKEDITOR.inline( 'content', CKEDITOR.tools.extend( {}, config, {
        extraPlugins: 'codesnippet'
      }, true ) );

      if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
        CKEDITOR.document.getById( 'ie8-warning' ).addClass( 'warning' );
      }

      $http.get('/api/notes/' + $routeParams.id)
        .success(function (note, status, headers, config) {
          $scope.title = note.title;
          CKEDITOR.instances.content.setData(note.note);
      });

  }])
;
 
