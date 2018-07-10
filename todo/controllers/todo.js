const Todo = require('../models/todo')

exports.todo_get_all = function (req, res) {
  Todo.find({}, function (err, foundLists) {
    if (err) console.error(err)
    else res.render('home', {toDos: foundLists})
  })
}

exports.todo_get_one = function (req, res) {
  Todo.findById(req.params.id, function (err, foundList) {
    if (err) console.error(err)
    else res.render('todo', {todo: foundList})
  })
}

exports.todo_update_one = function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, list) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
}

exports.todo_delete_one = function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
}

exports.todo_create_one = function (req, res) {
  Todo.create(req.body, function (err) {
    if (err) console.error(err)
    else res.sendStatus(200)
  })
}

exports.todo_render_new = function (req, res) {
  res.render('newToDo')
}
