const express = require('express')
const router = express.Router()
const storageArr = require('./storageArr')

router.get('/', function (req, res) {
  res.render('home', {toDos: storageArr})
})

module.exports = router
