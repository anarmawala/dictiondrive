var express = require('express');
var config = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('data', config.about);
});

/* GET legal page. */
router.get('/legal', function(req, res, next) {
  res.render('data', config.legal);
});

module.exports = router;
