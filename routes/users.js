var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/a', function(req, res, next) {
  res.send('Kim');
});

module.exports = router;
