var request = require('superagent');

var access_token = process.env.INSTAGRAM_ACCESS_TOKEN;
var count = 10;
request.get('https://api.instagram.com/v1/tags/snowy/media/recent')
  .query({ access_token, count })
  .end(function (err, res) {

    console.log(res.body);
  });
