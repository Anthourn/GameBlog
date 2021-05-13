const express = require('express')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.json())
app.use(express.static('public'))
const gameContoller = require('./controllers/blog_controllers.js')
app.use('/games', gameContoller)



app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('error', err =>
console.log(err.message, "is Mongod running?/Problem with Atlas connection?"))


mongoose.connection.on('connected', () => {
    console.log('mongo connection', MONGODB_URI);
})

mongoose.connection.on('diconnected', (err) => {
    console.log('mongo disconnected');
})
