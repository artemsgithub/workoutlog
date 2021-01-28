// express boilerplate. import express and store in variable
const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* ////////////////////////////////////
::::::::::::: USER SIGNUP::::::::::::::    
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

router.post("/register", function (req, res) {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then(
      // return response as a json
      function registrationSuccess(user) {
        let token = jwt.sign(
          { id: user.id, email: user.email },
          "i_am_secret",
          { expiresIn: 60 * 60 * 24 }
        );
        res.json({
          // display what the database is getting
          user: user,
          message: "User succesfully created",
          sessionToken: token,
        });
      }
    )
    // error catching
    .catch((err) => res.status(500).json({ error: err }));
});

/* ////////////////////////////////////
::::::::::::: USER LOGIN::::::::::::::    
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

router.post('/login', function(req, res){
    User.findOne({where: {email: req.body.user.email}})
    .then(function loginSuccess(user){
        if (user){
            bcrypt.compare(req.body.user.password, user.password, function (err, matches){
                if (matches){
                    let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: 60*60*24})
                    res.status(200).json({
                        user: user,
                        message: "User succesfully logged in",
                        sessionToken: token
                    })

                } else {
                    res.status(502).send({ error: "Login Failed"});
                }
            });
        } else {
            res.status(500).json({ error: 'User does not exist'})
        }
    })
        .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;
