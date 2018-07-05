const express = require('express')
const router = express.Router()
const Todo = require('./model')

router.get('/', function (req, res) {
  Todo.find({}, function (err, foundLists) {
    if (err) console.error(err)
    else {
      res.render('home', {toDos: foundLists})
    }
  })
})

router.get('/new', function (req, res) {
  res.render('newToDo')
})

router.get('/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, foundList) {
    if (err) console.error(err)
    else {
      res.render('todo', {todo: foundList})
    }
  })
})

router.put('/:id', function (req, res) { // Update existing todo
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, list) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
})

router.delete('/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
})

router.post('/', function (req, res) {
  Todo.create(req.body, function (err) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
})

module.exports = router
