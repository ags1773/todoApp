const express = require('express')
// const mongoose = require('mongoose')
const port = 3000

const app = express()

// mongoose.connect(process.env.DBURL2)

app.get('/', function (req, res) {
  res.send('Home page')
})

app.listen(port, function () {
  console.log(`Todo app running on port ${port}`)
})
