var async = require('async');
var request = require('request');
var mongoose = require('mongoose');
var log = require('../../core/log/')(module);
var Chapter = mongoose.model('Chapter');
var url = 'https://developers.google.com/groups/directorygroups/';

module.exports = function (callback) {
  request(url, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        log.error(e, 'parsing error');
        return;
      }
      if (!body.success) {
        return;
      }
      async.each(body.groups, function (group, cb) {
        Chapter
          .findOne({_id: group.gplus_id}) // jshint ignore:line
          .exec(function (err, chapter) {
            if (err) {
              return cb(err);
            }
            if (!chapter) {
              chapter = new Chapter();
            }
            chapter.import(group);
            chapter.save(function (err) {
              if (err) {
                return cb(err);
              }
              return cb();
            });
          });
      }, callback);
    }
  });
};
