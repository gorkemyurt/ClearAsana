/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/thistest'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/"**YOUR DATABASE**"'
  },
  staging: {
    root: rootPath,
    db: 'mongodb://heroku_app18701713:grgb67kmf1m6d2ks5pr4hkn34u@ds049868.mongolab.com:49868/heroku_app18701713'
  },
  production: {
    root: rootPath,
    db: 'mongodb://heroku_app18701713:grgb67kmf1m6d2ks5pr4hkn34u@ds049868.mongolab.com:49868/heroku_app18701713'
  }
}