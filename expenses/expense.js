const Sequelize = require("sequelize");
const Connection = require("../database/database.js");
const Categories= require("../categories/category.js")
const user = require("../users/user")


const expense = Connection.define("expenses",{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    value:{
        type: Sequelize.INTEGER,
        allowNull: false
        }
    ,
    category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    date:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    owner:{
        type: Sequelize.STRING,
        allowNull: false
    }

})



 
 expense.belongsTo(Categories);
 Categories.hasMany(expense);

 user.hasMany(expense)
console.log("db_ok")

expense.sync({force:false})


module.exports = expense;