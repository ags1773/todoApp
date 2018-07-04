const express = require('express')
const router = express.Router()
const storageArr = require('./storageArr')

router.get('/', function (req, res) {
  res.render('home', {toDos: storageArr})
})

router.get('/new', function (req, res) {
  res.render('newToDo')
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

// router.put('/:id', function (req, res) {
//   console.log(`PUT on /${req.params.id}`)
//   res.send(`Hit PUT`)
// })

router.post('/', function (req, res) {
  let tempObj = {}
  tempObj.title = req.body.title
  tempObj.content = req.body.content.split(',')
  // Remove ID when you add DB
  tempObj.id = req.body.id
  storageArr.push(tempObj)
  res.sendStatus(200)
})

module.exports = router
