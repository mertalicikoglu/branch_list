/**
 * Generates models from the given DB in to models directory
 */
const Sequelize = require('sequelize')
const SequelizeAuto = require('sequelize-auto')
//const config = require('config')
const config = require("../config/options");
const fs = require('fs')
const path = require('path')

const directory = path.join(__dirname, 'models')
// enable support for timestamps
const enableTimestamps = true

function setupTimestamps(callback) {
  // Setup sequelize
  const sequelize = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
  )

  // Add timestamps comlumns to all tables
  sequelize
    .query(
      `
     SET QUOTED_IDENTIFIER OFF;
 
     exec sp_msforeachtable
     "
     IF NOT EXISTS (
         SELECT *
         FROM   sys.columns
         WHERE  object_id = OBJECT_ID(N'?') AND ( name = 'CREATED_AT' OR name = 'UPDATED_AT' )
     )
     BEGIN
       alter table ? add
       CREATED_AT datetime2 not null default getdate(),
       UPDATED_AT datetime2 not null default getdate();
     END
     "
 
     SET QUOTED_IDENTIFIER ON;
     `
    )
    .catch(err => {
      console.error(err)
    })
    .then(() => {
      sequelize.close()
      if (callback) {
        callback()
      }
    })
}

const auto = new SequelizeAuto(
  config.db.name,
  config.db.username,
  config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle
  }
}
)

console.log(`\nGenerating models in: ${directory}`)
auto.run(err => {
  if (err) throw err

  console.log(
    '\nRemoving redundant models (views, sysdiagrams, aspnet, __MigrationHistory)'
  )
  fs.readdirSync(directory).forEach(file => {
    const tmpFile = file.toLowerCase()
    if (
      tmpFile[0] === 'V'.toLowerCase() ||
      tmpFile.includes('AspNet'.toLowerCase()) ||
      tmpFile.includes('sysdiagrams'.toLowerCase()) ||
      tmpFile.includes('__MigrationHistory'.toLowerCase())
    ) {
      fs.unlinkSync(path.join(directory, file))
    }
  })

  if (enableTimestamps) {
    console.log('\nEnabling timestamp support for database')

    setupTimestamps(() => {
      console.info('\nTask succesfully completed.')
    })
  } else {
    console.info('\nTask succesfully completed.')
  }
})
