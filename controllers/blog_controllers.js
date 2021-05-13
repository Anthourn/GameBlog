const express = require('express')
const games = express.Router()
const Game = require('../models/blog.js')
const gameSeed = require('../models/blog_seed.js')



games.get('/', (req, res) => {
    Game.find({},(err, foundGame) => {
        res.json(foundGame)
    })
})

games.post('/', (req, res) => {
        Game.create(req.body, (err, createGame) => {
            Game.find({}, (err, foundGame) => {
                res.json(foundGame)
            })
        })
})

games.get('/seed', (req, res) => {
    Game.insertMany(gameSeed, (err, allGame) => {
        res.redirect('/')
    })
})

games.put('/:id', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err, updatedGame) => {
        if(err) {
            res.send(err)
        } else {
            Game.find({}, (err, foundGame) => {
                res.json(foundGame)
            })
        }
    })
})

games.delete('/:id', (req, res) => {
    Game.findByIdAndRemove(req.params.id, (err, deletedGame) => {
        Game.find({}, (err, foundGame) => {
            res.json(foundGame)
        })
    })
})

module.exports = games
