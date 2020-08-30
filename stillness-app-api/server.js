const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('hello world')
})



app.listen(PORT, console.log(`server is running on ${PORT}`));

