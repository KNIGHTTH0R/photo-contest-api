// Initialize environment configuration
var path = require('path');
var dotenv = require('dotenv');
dotenv.config({ silent: true, path: path.join(process.env.HOME, '.env.test')});
dotenv.config({ silent: true, path: path.join(process.env.HOME, '.env') });
dotenv.config();

require('should');  // Load up shouldjs

describe('Photo Contest', function () {
  require('./integration/contests');
  require('./integration/photos');
});
