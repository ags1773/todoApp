const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: String,
  content: Array
})

module.exports = mongoose.model('Todo', todoSchema)
