// establish a connection to the database using sequelize
// boilerplate/set up file
require("dotenv").config()

const Sequelize = require('sequelize');
const sequelize = new Sequelize('workoutlog', 'postgres', process.env.db_pass,{
    host: 'localhost',
    dialect: 'postgres'
}); 

sequelize.authenticate().then(
    function() {
        console.log('Connected to workoutlog database')

    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;