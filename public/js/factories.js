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
  .factory('noteEditor', [function () {
    return  {
      show: function () {
        var height = $(window).height() - 450;
        $('#content').summernote({
          height: height,
          minHeight: 250,
          focus: true
        });
      },
      hide: function() {
        $('#content').destroy();
      }
    }
  }])
;