module.exports = {
  status: 'default',
  apiPrefix: '/api/1',
  port: process.env.PORT || 3000,
  pagingSize: 30,
  mongoose: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/gdg-api'
  },
  cron: {
    enabled: process.env.APP_CRON || false,
    dailyTime: '0 0 0 0 * *',
    hourlyTime: '0 0 * * * *',
    every5MinTime: '0 */5 * * * *',
    every15MinTime: '0 */15 * * * *',
    timeZone: 'Europe/Istanbul',
    autoStart: true
  }
};