const Sequelize = require("sequelize");


const connection = new Sequelize("personalfinance", "root", "root",{
    host: "172.17.0.2",//
    dialect: "mysql",
    timezone: "-03:00"
})

module.exports = connection;