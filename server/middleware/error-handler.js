var uuid = require('uuid')

module.exports = function (err, req, res, next) {
  if (!err) {
    return res.sendErrorMessage(500, 'Catastrophic error!')
  }

  var id = req.headers['x-request-id'] || uuid.v4()
  var status = err.status ? err.status : 500
  var code = status

  if (err.code) {
    code += '.' + err.code
  }

  if (status >= 500) {
    console.log(new Date().toISOString(), req.method, req.originalUrl, err.stack)
  }

  var result = {
    code: code,
    message: err.message
  }
  res.status(status).send(result)
}
