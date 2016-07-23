var express = require('express');
var router = module.exports = express.Router();

var Instagram = require('../../../services/instagram');

router.get('/', function (req, res) {
  console.log('photos!')
  Instagram.fetchRecentMediaByTag(req.contest.tag)
    .then(function (body) {
      res.send(body)
    })
    .catch(function (err) {
      console.error(err.stack);
      res.sendErrorMessage(400, err.message);
    })
})
