var async = require('async');
var config = require('config');
var express = require('express');
var app = express();

var log = require('../core/log/')(module);
var cronUtil = require('../cron/');
var expressUtil = require('../core/express/');

exports.init = function (cb) {
  async.seq(
    cronUtil.init.bind(null),
    expressUtil.init.bind(null, app),
    app.listen.bind(app, config.port)
  )(function () {
    log.info('APP is started at port:', config.port);
    if (cb) {
      cb(app);
    }
  });
};