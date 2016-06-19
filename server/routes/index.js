var contests = require('./contests')

module.exports = function (app) {
  app.use('/api/contests', contests)
};
