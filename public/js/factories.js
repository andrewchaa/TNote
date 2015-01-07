angular.module('noteApp')
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
  .factory('bindEditor', [function () {
    return function () {
      $('#summernote').summernote({
        height: 300,
        minHeight: 300,
        focus: true
      });

    }
  }])
;