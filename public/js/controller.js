noteApp = angular.module('noteApp', ['ngRoute', 'ngCookies'])
  .constant('VERSION', '0.1')
  .factory('authInterceptor', ['$rootScope', '$q', '$cookies', '$window', 
    function($rootScope, $q, $cookies, $window) {
      return {
        request: function (req) {
          req.headers = req.headers || {};
          if ($cookies.token) {
            req.headers.Authorization = 'Bearer ' + $cookies.token;  
          }
          
          return req;
        },
        responseError: function (rejection) {
          if (rejection.status == 401) {
            $window.location = '/#/login';      
          }

          return $q.reject(rejection);
        }
      }
  }])
  .factory('listNotes', ['$http', function ($http) {
    return function (scope) {
      $http.get('/api/notes')
        .success(function (notes, status, headers, config) {
          scope.notes = notes;
      });      
    }
  }])
  .factory('bindEditor', [function () {
    return function (elementId) {
      CKEDITOR.disableAutoInline = true;

      var config = {
        extraPlugins: 'codesnippet',
        toolbar: [[ 'Source' ], [ 'Undo', 'Redo' ], [ 'Bold', 'Italic', 'Underline' ], [ 'CodeSnippet' ]],
        codeSnippet_theme: 'default',
        height: 400
      };

      CKEDITOR.inline( elementId, CKEDITOR.tools.extend( {}, config, {extraPlugins: 'codesnippet'}, true ) );

      if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
        CKEDITOR.document.getById( 'ie8-warning' ).addClass( 'warning' );
      }

    }
  }])
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
      controller: 'homeCtrl',
      templateUrl: '../html/home.html'
    })
    .when('/_=_', {
      redirectTo: function () {
        return '/';
      }
    })
    .when('/notes/:id', {
      controller: 'editCtrl',
      templateUrl: '../html/home.html'
    })
    .when('/login', {
      controller:   'loginCtrl',
      templateUrl:  '../html/login.html'
    });

    $httpProvider.interceptors.push('authInterceptor');  
    }
  ])
  .controller('homeCtrl', ['$scope', '$http', '$location', 'listNotes', 'bindEditor',
    function noteCtrl($scope, $http, $location, listNotes, bindEditor) {

      listNotes($scope);
      bindEditor('content');

      $scope.save = function() {
        var title = $scope.title;
        var content = CKEDITOR.instances.content.getData();

        $http.post('/api/notes', { title: title, content: content })
          .success(function (note, status, headers, config) {
            $location.path('/' + note.id);
          });
      }


  }])

  .controller('editCtrl', ['$scope', '$routeParams', '$http', '$location', 'listNotes', 'bindEditor',
    function ($scope, $routeParams, $http, $location, listNotes, bindEditor) {

      listNotes($scope);
      bindEditor('content');

      $http.get('/api/notes/' + $routeParams.id)
        .success(function (note, status, headers, config) {
          $scope.title = note.title;
          CKEDITOR.instances.content.setData(note.content);
      });

      $scope.new = function() {
        $location.path('/');
      }

      $scope.save = function() {
        var content = CKEDITOR.instances.content.getData();
        $http.put('/api/notes/' + $routeParams.id, { title: $scope.title, content: content })
          .success(function (noteEntity) {
            $scope.title = noteEntity.title;
            CKEDITOR.instances.content.getData(noteEntity.content);
          });
      }

  }])

  .controller('loginCtrl', ['$scope', function ($scope) {

  }]);
 
