module.exports = function (req, res, next) {
  res.sendError = function (status, error) {
    error.status = status
    return next(error)
  }

  res.sendErrorMessage = function (status, message, extend) {
    var error = new Error(message)
    error.status = status
    for (var ext in extend) {
      if (extend.hasOwnProperty(ext)) {
        error[ext] = extend[ext]
      }
    }
    return next(error)
  }

  next()
}
