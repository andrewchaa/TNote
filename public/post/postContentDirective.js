angular.module('noteApp').directive('postContent', function () {
  return {
    // link: function (scope, element, attr) {
    //   var height = $(window).height() - 450;
    //   $('#content').summernote({
    //     height: height,
    //     minHeight: 250
    //   });
    // },

    templateUrl: '/post/postContent.html'
  }
});
