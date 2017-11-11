var express = require('express');
var router = express.Router();
var config = require('../config');

let localsData = {
  config: config.locals,
}

function updateLocals() {
  
}

updateLocals();
setInterval(updateLocals, config.locals.updateTime);

/* append locals */
router.use(function(req, res, next) {
  res.locals = localsData;
  next();
});

/* append title */
router.use(function(req, res, next) {
  res.locals.title = req.url.split("/").pop().toUpperCase();
  next();
});

module.exports = router;