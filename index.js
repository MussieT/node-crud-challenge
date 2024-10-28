const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const persons = require('./persons')
const router = require('./router')

const app = express()

// Test non existing user should be tested with Non existing user with id different from 1
app.use(cors())
app.use(bodyParser.json())

app.set('db', persons)
app.use(router)

// Non existing endpoint
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
    app.listen(3000)
}

module.exports = app;