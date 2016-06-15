module.exports = function (req, res, next) {
  res.sendError = function (status, error) {
    error.status = status
    return next(error)
  }

  res.sendErrorMessage = function (status, message) {
    var error = new Error(message)
    error.status = status
    return next(error)
  }

  next()
}
