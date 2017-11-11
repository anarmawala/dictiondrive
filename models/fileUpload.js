let mongoose = require('mongoose');
let fileUploadSchema = mongoose.Schema({
  keyWord: String,
  path: String,
  name: String,
  type: String,
  date: Date
});

let fileUpload = mongoose.model('fileUpload', fileUploadSchema);

module.exports = fileUpload;