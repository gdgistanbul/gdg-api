var log = require('./core/log/')(module);
var app = require('./app/');

var server = function (done) {
  app.init(function (err) {
    if (done) {
      if (err) {
        return done(err);
      }
      return done(null, app);
    }
  })
};

if (require.main === module) {
  log.info('server is started in standalone mode');
  server();
} else {
  log.info('server is started for testing');
  module.exports = server;
}

process.on('uncaughtException', function (err) {
  //noinspection JSCheckFunctionSignatures
  log.error(JSON.parse(
    JSON.stringify(err, ['stack', 'message', 'inner'], 3)));
});