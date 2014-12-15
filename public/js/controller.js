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

      CKEDITOR.on( 'instanceCreated', function( event ) {
        var editor = event.editor,
          element = editor.element;

        // Customize editors for headers and tag list.
        // These editors don't need features like smileys, templates, iframes etc.
        if ( element.is( 'h1', 'h2', 'h3' ) || element.getAttribute( 'id' ) == 'taglist' ) {
          // Customize the editor configurations on "configLoaded" event,
          // which is fired after the configuration file loading and
          // execution. This makes it possible to change the
          // configurations before the editor initialization takes place.
          editor.on( 'configLoaded', function() {

            // Remove unnecessary plugins to make the editor simpler.
            editor.config.removePlugins = 'colorbutton,find,flash,font,' +
              'forms,iframe,image,newpage,removeformat,' +
              'smiley,specialchar,stylescombo,templates';

            // Rearrange the layout of the toolbar.
            editor.config.toolbarGroups = [
              { name: 'editing',    groups: [ 'basicstyles', 'links' ] },
              { name: 'undo' },
              { name: 'clipboard',  groups: [ 'selection', 'clipboard' ] },
              { name: 'about' }
            ];
          });
        }
      });
        

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
 
