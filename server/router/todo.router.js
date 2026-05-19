const express = require('express')
const { getTodo, createTodo, updateTodo, deleteTodo } = require('../controller/todo.controller')
const router = express.Router()

router.get('/',getTodo)
router.post('/',createTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

module.exports = router