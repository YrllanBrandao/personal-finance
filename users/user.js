const Sequelize = require("sequelize");
const Connection = require("../database/database");



const  user = Connection.define("users", {
    email: {type: Sequelize.STRING, allowNull:false},
    password:{type: Sequelize.STRING, allowNull:false}

});





user.sync({force:false})
module.exports = user