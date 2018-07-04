const express = require('express')
const router = express.Router()
const storageArr = require('./storageArr')

router.get('/', function (req, res) {
  res.render('home', {toDos: storageArr})
})

router.get('/:id', function (req, res) {
  let temp = null
  for (let todo of storageArr) {
    if (todo.id.toString() === req.params.id) {
      temp = todo
      break
    }
  }
  if (temp) {
    res.render('todo', {todo: temp})
  } else {
    res.send('To Do not found')
  }
})

module.exports = router
