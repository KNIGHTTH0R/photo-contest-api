var errorHandler = require('./middleware/error-handler')
var requestId = require('./middleware/request-id')
var compression = require('compression')
var bodyParser = require('body-parser')
var express = require('express')
var routes = require('./routes')
var helmet = require('helmet')
var cors = require('cors')
var http = require('http')

/**
 * Initialize Express Application
 *
 * @return {Express}
 */
module.exports = function () {
  var app = express()
  app.set('x-powered-by', false)

  // Middleware
  app.use(requestId)
  app.use(compression())
  app.use(helmet.frameguard())
  app.use(helmet.noSniff())
  app.use(helmet.xssFilter())
  app.use(cors({origin: true, credentials: true}))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  // Routing
  routes(app)

  // Error handler
  app.use(errorHandler)

  return http.createServer(app)
}
