// import .env to ensure privacy 
require("dotenv").config()

// Require the use of express npm package 
let express = require('express');

// Create an instance of express, ie. create express app 
let app = express();

// import db database file
let sequelize = require('./db');

// import workoutlog controller and user controller 
let user = require('./controllers/usercontroller');
let workoutlog = require('./controllers/workoutLogController');


// sync defined models with the database 
sequelize.sync()
// sequelize.sync({force: true})

// json should be used to process requests, this must go above routes!! 
app.use(express.json());


// create global paths for the controllers, using the imported
// controllers above, and the defined variables
// passing in the controller makes any paths created in that controller subpaths 
// exposed route(/user)
app.use('/user', user)

// protected router (/workoutlog)
// http://localhost:3000/log
app.use('/log', workoutlog)


// LISTEN HERE create a UNIX socket in localhost:3000
let listener = app.listen(3000, function(){
    // pull out part of app.listen that contains the information with connection
    // key for dynamic display of port 
    let messageString = (listener._connectionKey)

    // clean it up to remove 6:::: characters as they are messsy 
    let cleanPortString = messageString.replace(/6::::/g, " ")

    console.log(`App is listening on port${cleanPortString}`)
})

