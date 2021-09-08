const Sequelize = require('sequelize')
//const config = require('config')
const config = require("../config/options");
const fs = require('fs')
const path = require('path')

const seeder = require('./seeder')
const associations = require('./associations')

const directory = path.join(__dirname, '/models/')

const models = {}

// Setup sequelize
const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  operatorsAliases: false,
  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle
  }
})

// Import models
fs.readdirSync(directory).forEach((file) => {
  const name = file.replace('.js', '')
  models[name] = require(path.join(directory, file))(sequelize, Sequelize.DataTypes)
})

// Setup model associations
associations.associate(models)

// Test connection
sequelize
  .authenticate()
  .then(() => {
    // Sync DB schema
    sequelize
      .sync({
        logging: false,
        // alter: true,
      })
      .then(() => {
        seeder.seed(models, () => {
          console.log('[sequelize] database synced\n')
        })
      })
      .catch((err) => {
        console.log(`\n${err.message}\n${err.stack}\n`)
      })
  })
  .catch((err) => {
    console.log(`\n${err.message}\n${err.stack}\n`)
  })

module.exports = {
  models,
  sequelize,
}
