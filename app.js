const express = require('express')
const path = require('path') // core node lib for parsing file & directory paths
const bodyParser = require('body-parser') // needed to read POST request data. This makes it accessable through req.body
const app = express()
const navRoutes = require('./routes')
const mongoose = require('mongoose')
const port = 3000

mongoose.connect(process.env.DBURL2)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public'))) // express.static is a middleware to serve static files in /public directory in the project root
app.use(bodyParser.json())
app.use(navRoutes)

app.listen(port, function () {
  console.log(`Todo app running on port ${port}`)
})
