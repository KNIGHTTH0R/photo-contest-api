var unidecode = require('unidecode');
var uuid = require('uuid')

var contestIndex = {};
var contestDb = [];

exports.create = function (name, startedAt, tag) {
  var slug = unidecode(name).trim().toLowerCase().replace(/\W+/g, '-').replace(/^-|-$/g, '');
  if (contestIndex[slug]) {
    return
  }
  var createdAt = Date.now()
  var contest = { name, slug, startedAt, tag, createdAt };
  contestDb.push(contest);
  contestIndex[contest.slug] = contest;

  return contest
};

exports.get = function (slug) {
  var contest = contestIndex[slug];
  if (contest) {
    return JSON.parse(JSON.stringify(contest));
  }
};

exports.list = function () {
  return JSON.parse(JSON.stringify(contestDb));
};

exports.destroy = function (slug) {
  if (!contestIndex[slug]) {
    return
  }

  var contest = contestIndex[slug]
  var index = contestDb.indexOf(contest)
  delete contestIndex[slug]

  return contestDb.splice(index, 1)
};
