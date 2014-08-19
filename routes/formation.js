var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res) {
  var uri = '';
  if (process.env.NODE_ENV === 'production') {
    uri = 'http://' + config.production.host + ':' + config.production.port + '/';
  } else {
    uri = 'http://' + config.dev.host + ':' + config.dev.port + '/';
  }
  res.render('formation', { uri: uri });
});

module.exports = router;
