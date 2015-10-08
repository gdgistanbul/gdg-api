var mongoose = require('mongoose');
require('mongoose-schema-extend');
var log = require('../log/')(module);
var config = require('config');
var modelsPath = process.cwd() + '/app/models';
var options = {};
options.server = {};
options.replset = {};
options.server.socketOptions = options.replset.socketOptions = {keepAlive: 1};

var connectionUrl = function () {
  return config.test ? config.mongoose.testUri : config.mongoose.uri;
};

var initWithUrl = exports.initWithUrl = function (url, cb) {
  mongoose.connect(url, options);
  var db = mongoose.connection;
  var models = [
    'identityCounter',
    'chapter'
  ];
  models.forEach(function (file) {
    require(modelsPath + '/' + file);
  });

  db.on('error', function (err) {
    log.error(err);
  });
  db.once('open', function () {
    log.info('db connection is established');
    cb();
  });
};

exports.init = function (cb) {
  initWithUrl(connectionUrl(), cb);
};