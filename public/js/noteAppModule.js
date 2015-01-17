noteApp = angular.module('noteApp', ['ngRoute', 'ngCookies', 'ngSanitize'])
  .constant('VERSION', '0.1')
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        controller: 'homeCtrl',
        templateUrl: '../html/home.html'
      })
      .when('/_=_', {
        redirectTo: function () {
          return '/';
        }
      })
      .when('/login', {
        controller:   'loginCtrl',
        templateUrl:  '../html/login.html'
      })
      .when('/:id', {
        controller: 'postCtrl',
        templateUrl: '../post/post.html'
      });

    $httpProvider.interceptors.push('authInterceptor');  
  }]);
 
