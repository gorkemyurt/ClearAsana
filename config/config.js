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
  }
  // },
  // staging: {
  //   root: rootPath,
  //   db: 'mongodb://heroku_app18193488:itgke13j50hrojfi876djpqrem@ds045628.mongolab.com:45628/heroku_app18193488'
  // },
  // production: {
  //   root: rootPath,
  //   db: 'mongodb://heroku_app18101433:p9ojlriie26t4atd270dp9v44s@ds043398.mongolab.com:43398/heroku_app18101433'
  // }
}