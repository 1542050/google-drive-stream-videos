/*
* @Author: kimbui
* @Date:   2017-03-10 00:26:04
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-10 08:41:02
*/

exports.index = function(req, res, next) {
  res.render('getlink/index', {
      title: "Google Drive API Get Link Proxy",
      
  });
}