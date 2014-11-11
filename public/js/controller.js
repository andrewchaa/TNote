var noteApp = angular.module('noteApp', ['ngSanitize']);

noteApp.controller('noteCtrl', ['$scope', '$http', '$sce', function noteCtrl($scope, $http, $sce) {
    $scope.contentHtml = function() {
        // return $sce.trustAsHtml(
            return
        "
        <h2>Enjoy live editing (+markdown)</h2>"; "

        <p><b><i>Click to edit, Select to apply effect, click items of toolbar to toggle effects.</i></b></p>
        <hr>
        <p>Horizontal-Rule can be inserted by click「...」on the toolbar or just type「... 」/「--- 」/「*** 」at line start. Note that
          there's a SPACE at the end of a command.</p>
        <hr>
        <p>To link or unlink, please press the <i>ENTER</i> key after you filled the input field with your a link. A <a
          href=\"/sofish\">link</a> can be unlink by applying an empty value to the input field.

        <p>
        <ul>
          <li>Ordered list and unordered list are supported.</li>
          <li>Use the toolbar or use markdown syntax like「<b>1. </b>」,「<b>- </b>」or「<b>* </b>」</li>
        </ul>
        <blockquote>You can quote text by type「<b>&gt;</b>」at line start.</blockquote>
        <p>What about add underline to text? \"<u>Stay Hungry, Stay Foolish - <i>Steve Jobs</i></u>\".</p>
        <pre>A code block is also supported by type 「```」 at line start and press SPACE.</pre>
        <p>For more, please checkout: <a href=\"https://github.com/sofish/pen#readme\" target=\"_blank\">https://github.com/sofish/pen#readme</a>
        </p>
        "
            
            );
    }

    $scope.clickMe = function(e) {
        console.log(e);
    }
}]);
 
