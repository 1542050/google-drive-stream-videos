/*
* @Author: kimbui
* @Date:   2017-03-08 09:30:11
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-08 16:09:56
*/

'use strict';
require('dotenv').load();
var http = require('http')
const app = require('router')

module.main = http.createServer((req, res) => {
  console.log(process.env.VIRTUAL_HOST)
  app(req, res)
  res.end()
})

module.main.listen(8000)
console.log("Server running at http://127.0.0.1:8000/");