const Sequelize = require('sequelize')
const db = {}
const sequelize =  new Sequelize('tcc', 'root', '1234', {
  host: 'db', // docker-compose service
  // host: 'localhost', // local
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: '0',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  },
  dialectOptions: {
    // Your mysql2 options here
    // decimalNumbers: true
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db