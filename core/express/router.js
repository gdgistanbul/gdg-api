var config = require('config');
var express = require('express');

var controllers = require('./controller');

exports.init = function (app) {
  var router = express.Router();
  router.route('*').get(controllers.site.index);
  app.use(router);
};