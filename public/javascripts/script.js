/*
* @Author: kimbui
* @Date:   2017-03-10 00:36:50
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-10 01:50:11
*/

'use strict';

var GoogleDrive = GoogleDrive || {};

GoogleDrive.getLinkEvent = function() {
  $('button#submit-get-link-google-video').on('click', function() {
    var url = $('#googlelink').val();

    if (url.split('/')[2] == 'drive.google.com' && url.split('/')[3] == 'file') {
      var id = url.split('/')[5];
      var btn = $('button#submit-get-link-google-video');
      if (url.length) {
        var path = '/api/googledrive/' + id + '?token=123';
        $(btn).prop('disabled', true);
        $.ajax({
          type: "GET",
          url: path,
          data: {
          },
          cache: false,
          success: function(data){
            console.log(data);

            var str = JSON.stringify(data, null, 2);

            $('#result').val(str);

            $(btn).prop('disabled', false);
          }
        });
      } else {
        alert('Please enter google ID');
      }
    } else {
      alert('Link Invalid')
    }
  });
}




GoogleDrive.main = function() {
  GoogleDrive.getLinkEvent();
}


$(document).ready(function() {
  GoogleDrive.main();
});
