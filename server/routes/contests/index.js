var express = require('express');
var router = module.exports = express.Router();

var photos = require('./photos');
var Contest = require('../../services/contest');

router.use('/:contestSlug/photos', photos)

router.param('contestSlug', function (req, res, next, id) {
  req.contest = Contest.get(id);

  if (!req.contest) {
    return res.sendErrorMessage(404, 'Not Found');
  }

  next();
});

router.route('/')
  .get(function (req, res, next) {
    res.send(Contest.list().sort(function (a, b) {return a.slug - b.slug}));
  })
  .post(function (req, res, next) {
    var contest = Contest.create(req.body.name, new Date(req.body.startedAt).getTime(), req.body.tag);

    if (!contest) {
      return res.sendErrorMessage(400, 'Duplicate name');
    }

    res.send(contest);
  });

router.route('/:contestSlug')
  .get(function (req, res, next) {
    res.send(req.contest);
  })
  .delete(function (req, res, next) {
    var contest = Contest.destroy(req.contest.slug);
    if (!contest) {
      next();
    }

    res.status(204).end();
  });
