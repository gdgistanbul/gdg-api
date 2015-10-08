var config = require('config');
var express = require('express');

var controllers = require('./controller');

exports.init = function (app) {
  var api = express.Router();
  var chapter = express.Router();
  chapter.route('/').get(controllers.chapter.get);
  api.use('/chapter', chapter);
  app.use(config.apiPrefix, api);
  var router = express.Router();
  router.route('*').get(controllers.site.index);
  app.use(router);
};