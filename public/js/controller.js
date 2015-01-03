noteApp = angular.module('noteApp', ['ngRoute', 'ngCookies'])
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
      .when('/notes/:id', {
        controller: 'editCtrl',
        templateUrl: '../html/home.html'
      })
      .when('/login', {
        controller:   'loginCtrl',
        templateUrl:  '../html/login.html'
      });

    $httpProvider.interceptors.push('authInterceptor');  
  }])

  .controller('loginCtrl', ['$scope', function ($scope) {

  }]);
 
