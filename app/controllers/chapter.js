var mongoose = require('mongoose');
var Chapter = mongoose.model('Chapter');

exports.get = function (req, res, next) {
  Chapter.find().exec(function (err, docs) {
    if (err) {
      return next(err);
    }
    return next(docs);
  });
};