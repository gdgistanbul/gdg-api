var cron = require('cron');
var config = require('config');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var log = require('../core/log/')(module);

var cronPath = process.cwd() + '/cron';
var cron5min = cronPath + '/every5min';
var cron15min = cronPath + '/every15min';
var cronHourly = cronPath + '/hourly';
var cronDaily = cronPath + '/daily';

var getFiles = function (path) {
  return _.filter(fs.readdirSync(path), function (file) {
    return file.match(/\.js$/);
  });
};

var onTick = function (files, path) {
  async.each(
    files,
    function (file, cb) {
      require(path + '/' + file)(function (err) {
        if (err) {
          log.error('Cron task failed', err);
        }
        cb();
      });
    },
    function (err) {
      if (err) {
        log.error('cron task error', err);
      }
    }
  );
};

var newCron = function (path, cronTime) {
  var files = getFiles(path);
  if (files && files.length) {
    new cron.CronJob({
      cronTime: cronTime,
      onTick: onTick.bind(null, files, path),
      start: config.cron.autoStart,
      timeZone: config.cron.timeZone
    }).start();
  }
};

exports.init = function (cb) {
  if (config.cron.enabled) {
    newCron(cron5min, config.cron.every5MinTime);
    newCron(cron15min, config.cron.every15MinTime);
    newCron(cronHourly, config.cron.hourlyTime);
    newCron(cronDaily, config.cron.dailyTime);
  } else {
    log.info('Cron service is disabled');
  }
  if (cb) {
    cb();
  }
};