var contests = require('./contests')

module.exports = function (app) {
  app.param('contestSlug', contests.id)

  app.route('/contests')
    .get(contests.list)
    .post(contests.create)

  app.route('/contests/:contestSlug')
    .get(contests.get)
    .delete(contests.delete)
};
