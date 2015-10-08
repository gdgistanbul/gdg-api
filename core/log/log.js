var _ = require('underscore');
var winston = require('winston');
var arrayUtil = require('../util/array');

var traceCaller = function () {
  var stack = ((new Error()).stack).split('\n');
  if (stack.length > 4) {
    var line = stack[4];
    var root = process.cwd();
    var start = line.indexOf(root) + 1 + root.length;
    var end = line.indexOf(')', start);
    var log;
    if (end !== -1) {
      log = line.slice(start, end);
    } else {
      log = line.slice(start);
    }
    return '[' + log + ']';
  }
  return '';
};


function getLogger(module) {
  var path = module.filename
    .replace(process.cwd(), '')
    .split('\\')
    .join('/');

  var transports = [
    new winston.transports.Console({
      colorize: true,
      levels: 'debug',
      label: path
    })
  ];
  var logger = new winston.Logger({transports: transports});
  var oldLog = logger.log;
  logger.log = function () {
    var args = arrayUtil.getArguments.apply(this, arguments);
    args.splice(1, 0, traceCaller());
    args = _.map(args, function (arg) {
      return arg && _.isString(arg) ? arg.replace(/\r?\n|\r/, '') : arg;
    });
    oldLog.apply(logger, args);
  };
  return logger;
}

module.exports = getLogger;