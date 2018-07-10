const express = require('express')
const path = require('path') // core node lib for parsing file & directory paths
const bodyParser = require('body-parser') // needed to read POST request data. This makes it accessable through req.body
const app = express()
const mongoose = require('mongoose')

const navRoutes = require('./todo/routes/todo')

mongoose.connect(process.env.DBURL2)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'todo/views'))
app.use(express.static(path.join(__dirname, 'public'))) // express.static is a middleware to serve static files in /public directory in the project root
app.use(bodyParser.json())
app.use(navRoutes)

module.exports = app
