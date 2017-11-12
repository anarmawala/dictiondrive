var express = require('express');
var wordList = require('an-array-of-english-words');
var fs = require('fs');
var config = require('../config');
var fileUpload = require('../models/fileUpload');
var router = express.Router();

var clearFiles = function() {
  var cutoff = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  fileUpload.find({
    date: {
      $lt: cutoff
    }
  }, function (err, data) {
    data.forEach(function(e) {
      console.log(`${e.keyword} removed at ${e.path}`);
      fs.unlink(e.path);
      e.remove();
    });
  });
  console.log("Scanned for old files");
};
clearFiles();
setInterval(clearFiles, 60000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST files */
router.post('/upload', function(req, res, next) {  
  console.log(req.headers);
  var usedWords = [];
  fileUpload.find({}, function (err, data) {
    if (err) throw err;
    data.forEach(function(item) {
      usedWords.push(item.keyWord);
    });
  });
  var freeWords = wordList.filter(function (word) {
    return usedWords.indexOf(word)==-1;
  });
  
  var keyWord = freeWords[Math.floor(Math.random() * freeWords.length)];
  var file = req.files.file;
  var toSave = new fileUpload({
    keyWord: keyWord,
    path: file.path,
    name: file.name,
    type: file.type,
    date: Date()
  });
  toSave.save(function(err) {
    console.log(keyWord);
    if (err) next(err);
  });
  res.send(keyWord);
});

/* GET file */
router.get('/:keyWord', function(req, res, next) {
  fileUpload.findOne({
    keyWord: req.params.keyWord.toLowerCase()
  }, function(err, data) {
    if (err || data === null) return next();
    res.download(data.path, data.name);
  });
});

module.exports = router;
