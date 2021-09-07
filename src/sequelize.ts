const config = require('config')
import Sequelize from 'sequelize'
//const config = require("../src/config/default.json");

const sequelize = new Sequelize(config.get("database"),config.get("user"),config.get("password"),
  {
    host: config.get("host"),
    dialect: config.get("dailect"),

    pool: {
      min: 0,
      max: 5,
      idle: 10000,
      acquire: 30000
    }
  }
)

export async function connect (): Promise<void> {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log('Connection to DB has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
}

export const instance = sequelize