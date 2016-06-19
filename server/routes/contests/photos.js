var express = require('express');
var router = module.exports = express.Router();

var Instagram = require('../../services/instagram');

router.get('/', function (req, res) {
  Instagram.fetchRecentMediaByTag(req.contest.tag)
    .then(function (body) {
      console.log('body')
      res.send(body)
    })
    .catch(function (err) {
      console.error(err);
      res.sendErrorMessage(400, err.message);
    })
})
