angular.module('noteApp').factory('noteEditor', [function () {
    return  {
      show: function () {
        var height = Math.max($(window).height(), $(document).height90) - 450;
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
