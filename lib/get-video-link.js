/*
* @Author: kimbui
* @Date:   2017-03-08 16:11:24
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-08 23:26:03
*/

'use strict';

var got = require('got')

module.exports = (docId) => {
  return Promise.all([
    posiblePromise(getFromMailDomain(docId)),
    posiblePromise(getFromUseDrive(docId))
  ])
  .then(result => {
    var [resultFromMail, resultFromDrive] = result
    if (resultFromMail !== null) {
      return Promise.resolve(resultFromMail)
    }

    if (resultFromDrive !== null) {
      console.log(resultFromDrive);
      return Promise.resolve(resultFromDrive)
    }
    return Promise.resolve(null)
  })
}

// Get link from https://mail.google.com
function getFromMailDomain = (docId) => {
  return got(`https://mail.google.com/a/e/nodeepshit.com/get_video_info?docid=${docId}`, {
    timeout: 3600,
    retries: 1,
    headers: {
      'user-agent': process.env.AGENT,
      'cookie': process.env.COOKIE
    }
  })
}

// Get link from https://drive.google.com
function getFromUseDrive = (docId) => {
  return got(`https://drive.google.com/get_video_info?docid=${docId}`, {
    timeout: 3600,
    retries: 1,
    headers: {
      'user-agent': process.env.AGENT,
    }
  })
}

// Same it try catch
function posiblePromise = (p, defaultValue = null) => {
  return new Promise(resolve => {
    p.then(resolve).catch(err => {
      resolve(defaultValue)
    })
  })
}
