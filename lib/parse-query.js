/*
* @Author: kimbui
* @Date:   2017-03-09 11:30:18
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 11:30:20
*/

'use strict';

const qs = require('querystring')
const url = require('url')

module.exports = (req, res, next) => {
  req.query = qs.parse(
    url.parse(req.url).query
  )
  next()
}