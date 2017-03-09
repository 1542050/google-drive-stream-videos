/*
* @Author: kimbui
* @Date:   2017-03-08 13:06:19
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 12:47:50
*/

'use strict';

var base64 = require('base64url')

const createProxyVideo = (video, cookie) => {
  return Object.assign({}, video, {
    provider: 'proxy',
    src: toProxyURL(video.originSrc, cookie)
  })
}

const toProxyURL = (url, cookie) => {
  var hash = base64(JSON.stringify({
    cookie,
    domain: url.split('/videoplayback?')[0]
  }))
  return `http://${process.env.VIRTUAL_HOST}:${process.env.PORT}/videoplayback?hash=${hash}&` + url.split('?').pop()
}

module.exports = {
  createProxyVideo: createProxyVideo
}