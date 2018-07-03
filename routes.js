const express = require('express')
const router = express.Router()
const storageArr = require('./storageArr')

router.get('/', function (req, res) { // home page displays only titles of todo lists
  let titles = []
  storageArr.forEach(e => titles.push(e.title))
  res.render('home', {titles: titles})
})

module.exports = router
