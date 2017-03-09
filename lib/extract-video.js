/*
* @Author: kimbui
* @Date:   2017-03-09 10:48:19
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 11:24:37
*/

'use strict';

const qs = require('querystring')
const url = require('url')

module.exports = (html) => {
  if (html === null) {
    throw new Error('Nothing from Google')
  }

  const query = qs.parse(html)
  if (query.status != 'ok') {
    throw new Error(query.reason)
  }

  return query.fmt_stream_map
  .split(',')
  .map(itagAndUrl => {
    const [itag, url] = itagAndUrl.split('|')
    const result = {
      source: 'googledrive',
      resolution: getVideoResolution(itag),
      label: getVideoResolution(itag) + 'p',
      type: 'video/mp4',
      src: toRedirectorURL(url),
      originSrc: url
    }
    return result;
  })
  .filter(video => video.res !== 0)
}

const getVideoResolution = (itag) => {
  var videoCode = {
    '18': 360,
    '59': 480,
    '22': 720,
    '37': 1080
  }
  return videoCode[itag] || 0
}

const toRedirectorURL = (src) => {
  var query = qs.parse(
    url.parse(src).query
  )
  delete query.driveid
  return 'https://redirector.googlevideo.com/videoplayback?' + qs.stringify(query)
}
