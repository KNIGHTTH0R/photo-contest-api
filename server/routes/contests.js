var Contest = require('../services/contest');

exports.id = function (req, res, next, id) {
  req.contest = Contest.get(id);

  if (!req.contest) {
    return res.sendErrorMessage(404, 'Not Found');
  }

  next()
}

exports.list = function (req, res, next) {
  res.send(Contest.list());
}

exports.get = function (req, res, next) {
  res.send(req.contest);
}

exports.create = function (req, res, next) {
  var contest = Contest.create(req.body.name, req.body.startedAt, req.body.tags);

  if (!contest) {
    return res.sendErrorMessage(400, 'Duplicate name');
  }

  res.send(contest);
}

exports.delete = function (req, res, next) {
  var contest = Contest.delete(req.contest.slug);
  if (!contest) {
    next();
  }

  res.status(204).end();
}
