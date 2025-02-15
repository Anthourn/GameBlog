const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: String,
    year: String,
    genre: String,
    review: String,
    image: String,
    rating: String,
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;
