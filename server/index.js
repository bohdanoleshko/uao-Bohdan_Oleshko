const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/date.route')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect('mongodb://mongo:27017')

        app.use(cors())

        app.use(express.json())
        app.use('/api', routes)

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}
start()
