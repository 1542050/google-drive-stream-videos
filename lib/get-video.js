/*
* @Author: kimbui
* @Date:   2017-03-08 23:59:32
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 11:24:40
*/

'use strict';

const getVideoLink = require('./get-video-link')
const extractVideos = require('./extract-video')
const proxy = require('./proxy')

module.exports = (req, res, docId) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')

  getVideoLink(docId)
  .then(
    response => ({
      'videos': extractVideos(response.body),
      'driveCookieHeader': response.headers['set-cookie']
    })
  )
  .then(
    ({videos, driveCookieHeader}) => {
      const proxied = videos.map(
        video => proxy.createProxyVideo(video, driveCookieHeader)
      )
      const result = JSON.stringify({
        status: 'OK',
        data: [...videos, ...proxied].map(video => {
          delete video.originSrc
          return video
        })
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf8')
      return res.end(result)
    }
  )
  .catch((err) => {
    res.statusCode = 200
    return res.end(JSON.stringify({
      status: 'FAIL',
      reason: err.toString()
    }))
  })
}

