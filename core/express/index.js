var express = require('express');
var compress = require('compression');
var morgan = require('morgan');
var responseTime = require('response-time');
var bodyParser = require('body-parser');

var log = require('../log/')(module);
var request = require('./request');
var router = require('./router');
var response = require('./response');
var cwd = process.cwd();

exports.init = function (app, cb) {
  app.set('views', cwd + '/app/views');
  app.set('view engine', 'jade');
  app.set('x-powered-by', false);
  app.use(express.static(cwd + '/public'));
  app.use(request.id);
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(responseTime());
  app.use(request.json);
  router.init(app);
  app.use(response.notFound);
  app.use(response.end);
  log.info('Express init');
  if (cb) {
    cb();
  }
};