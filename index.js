// Initialize environment configuration
var path = require('path');
var dotenv = require('dotenv');
dotenv.config({ silent: true, path: path.join(process.env.HOME, '.env.' + (process.env.NODE_ENV || 'development')) });
dotenv.config({ silent: true, path: path.join(process.env.HOME, '.env') });
dotenv.config();

var Server = require('./server')
var server = new Server()

server.listen(process.env.PORT, '0.0.0.0', function () {
  console.log('Server started on port %d in %s mode.', process.env.PORT, process.env.NODE_ENV || 'development')
})
