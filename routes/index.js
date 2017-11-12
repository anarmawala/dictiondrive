var express = require('express');
var wordList = require('an-array-of-english-words');
var config = require('../config');
var fileUpload = require('../models/fileUpload');
var router = express.Router();

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
router.get('/download/:keyWord', function(req, res, next) {
  fileUpload.findOne({
    keyWord: req.params.keyWord
  }, function(err, data) {
    if (err) next(err);
    res.download(data.path, data.name);
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  var file = req.files.upload;
  var keyWord = 
  res.render('about');
});

/* GET legal page. */
router.get('/legal', function(req, res, next) {
  res.render('legal');
});

module.exports = router;
