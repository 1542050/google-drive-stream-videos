/*
* @Author: kimbui
* @Date:   2017-03-08 09:30:11
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 23:02:19
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

app.get('/hello.txt', function(req, res){
    var body = '<h1>Hello World</h1>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});



// BEGIN
// app.use(require('./routes/notes'))
// var notes = require('./routes/notes')



// END













module.exports = http.createServer((req, res) => {
  app(req, res, require('finalhandler')(req, res))
  // res.end()
})

module.exports.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.VIRTUAL_HOST}:${process.env.PORT}/`);  
})