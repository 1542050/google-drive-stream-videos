/*
* @Author: kimbui
* @Date:   2017-03-08 09:30:11
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 11:30:47
*/

'use strict';
require('dotenv').load();
const getVideo = require('./lib/get-video')
var http = require('http')
const app = require('router')()
app.use(require('./lib/parse-query'))

// Create API Stream Video
app.get('/videoplayback', require('./lib/videoplayback'))

// Create API Get Video From Google Drive
app.get('/:provider/:id', function (req, res) {
  getVideo(req, res, req.params.id)
})


module.exports = http.createServer((req, res) => {
  app(req, res, require('finalhandler')(req, res))
  // res.end()
})

module.exports.listen(8000)
console.log("Server running at http://127.0.0.1:8000/");