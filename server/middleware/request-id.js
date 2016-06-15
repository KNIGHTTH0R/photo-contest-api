
var uuid = require('uuid')
/**
  Set a request ID if it doesn't already exist
*/
module.exports = function (req, res, next) {
  req.headers['x-request-id'] = req.headers['x-request-id'] || uuid.v4()
  req.id = req.headers['x-request-id'] // Shorthand
  next()
}
