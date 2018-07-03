const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect(process.env.DBURL2)

Todo.create({
  title: 'sample title',
  content: [{tid:1, data: 'Buy milk'}, {tid: 2, data: 'Walk the dog'}, {tid: 3, data: 'Clean house'}, {tid: 4, data: 'Wash car'}]
}, function (err, newToDo) {
  if (err) throw err
  console.log('todo created')
  newToDo.save(function (err) {
    if (err) throw err
    console.log('todo saved to db')
  })
})
