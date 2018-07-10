const express = require('express')
const router = express.Router()

const todoControllers = require('../controllers/todo')

router.get('/', todoControllers.todo_get_all)

router.get('/new', todoControllers.todo_render_new)

router.get('/:id', todoControllers.todo_get_one)

router.put('/:id', todoControllers.todo_update_one)

router.delete('/:id', todoControllers.todo_delete_one)

router.post('/', todoControllers.todo_create_one)

module.exports = router
