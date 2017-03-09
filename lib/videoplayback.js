/*
* @Author: kimbui
* @Date:   2017-03-09 10:53:55
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 12:41:45
*/

'use strict';

const qs = require('querystring')
const base64 = require('base64url')
const got = require('got')
const handleError = require('./error-handler')

module.exports = (req, res) => {
  // console.log(req.query)
  if (!req.query.hash) throw new Error()
  const upstream = JSON.parse(base64.decode(req.query.hash))

  delete req.query.hash
  delete req.query.driveid

  const query = qs.stringify(req.query)
  const originVideo = {
    url: `${upstream.domain}/kimdepzai?${query}`,
    cookie: upstream.cookie
  }
  
  const headers = Object.assign({}, req.headers, {
    cookie: originVideo.cookie
  })

  // do not let upstream know about host and referer
  delete headers.host
  delete headers.referer
  
  got.stream(originVideo.url, { headers })
    .on('response', (response) => {
      res.statusCode = response.statusCode
      Object.keys(response.headers).forEach(key => {
        res.setHeader(key, response.headers[key])
      })
    })
    .on('error', handleError)
    .pipe(res)
}
