angular.module('noteApp').directive('noteContent', function () {
  return {
    // link: function (scope, element, attr) {
    //   var height = $(window).height() - 450;
    //   $('#content').summernote({
    //     height: height,
    //     minHeight: 250
    //   });
    // },

    templateUrl: '../html/directives/content.html'
  }
});
