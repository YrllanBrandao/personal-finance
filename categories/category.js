const Connection = require("../database/database.js");
const Sequelize = require("sequelize");





const Categories = Connection.define('categorias',{
            title:{
                type: Sequelize.STRING,
                allowNull: false
            },
            slug:{
                type: Sequelize.STRING,
                allowNull: false
            }
})


Categories.sync({force:false})
module.exports = Categories