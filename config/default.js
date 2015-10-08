module.exports = {
  status: 'default',
  apiPreFix: '/api/1',
  port: process.env.PORT || 3000,
  pagingSize: 30,
  mongoose: {
    uri: process.env.MONGO_URL || 'mongo://localhost/gdg-api'
  }
};