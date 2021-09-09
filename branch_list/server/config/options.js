module.exports = {
  devServer: {
    host: 'localhost+',
    port: 3000,
    https: true,
  },
  db: {
    uri:
      'mysql://root:123456@mysqldb:3306/mindbehind',
    name: 'mindbehind',
    host: "mysqldb",
    port: 3306,
    username: 'root',
    password: '123456',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  iss: '',
  secret: 'someSecretStringToUseForAuthorizationRequests'
}