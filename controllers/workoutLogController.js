// express boilerplate. import express and store in variable 
let express = require('express')
let router = express.Router()
let validateSession = require('../middleware/validate-session')
let Log = require('../db').import('../models/log')

// use router.get() to set up a route after /workoutlog
// validate session to protect the route 
router.get('/log', validateSession, function(req, res){
    res.send('This is our log route')
})

// Create A Log Entry POST
// http://localhost:3000/log
// http://localhost:3000/log/
router.post('/', validateSession, (req,res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id, 
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
})

// GET Logs By User GET 
router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
});


module.exports = router

// GET WORKOUT by ID
router.get('/:id',  function(req,res){
    let userByID = req.params.id// id value is 12 
    Log.findAll({
        where: { id: userByID }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
})

// GET WORKOUT by ID
router.get('/:id', function(req,res){
    let entryByID = req.params.id
    Log.findAll({
        where: { id: entryByID }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
})

// PUT WORKOUT by ID
router.put('/:id', validateSession, function(req,res){
    let updateByID = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id, 
    };

    const query = { where: { id: req.params.id }}

    Log.update(updateByID, query)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
})

// DELETE WORKOUT by ID

router.delete('/:id', validateSession, function(req, res){
    const query = { where: { id: req.params.id}}

    Log.destroy(query)
        .then(() => res.status(200).json({ message: "Removed"}))
        .catch((err)=> res.status(500).json({ error: err}))
})