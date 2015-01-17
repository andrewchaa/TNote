angular.module('noteApp').directive('homeContent', function () {
    return {
      link: function (scope, element, attr) {
        var height = Math.max($(window).height(), $(document).height(), 700) - 350;
        $('#content').summernote({
          height: height,
          minHeight: 250
        });
      },

      templateUrl: '/home/homeContent.html'
    }
  });
