var uuid = require('uuid')

module.exports = function (err, req, res, next) {
  if (!err) {
    next()
  }

  var id = req.headers['x-request-id'] || uuid.v4()
  var status = err.status ? err.status : 500
  var code = status

  if (err.code) {
    code += '.' + err.code
  }

  if (status >= 500) {
    console.log(new Date().toISOString(), req.method, req.originalUrl, err.stack)
    // global.logger.error(err.message, {
    //   timestamp: Date.now(),
    //   date: new Date().toISOString(),
    //   requestId: id,
    //   code: err.code ? err.code : null,
    //   status: status,
    //   stack: err.stack,
    //   url: req.originalUrl,
    //   method: req.method
    // })
  }

  var result = {
    code: code,
    message: err.message
  }
  if (err.errors) {
    result.errors = err.errors
  }
  res.status(status).send(result)
}
