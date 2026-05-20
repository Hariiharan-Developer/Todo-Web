const express = require('express')
const { getTodo, createTodo, updateTodo, deleteTodo } = require('../controller/todo.controller')
const protect = require('../middleware/protect')
const router = express.Router()

router.get('/',protect,getTodo)
router.post('/',protect,createTodo)
router.put('/:id',protect,updateTodo)
router.delete('/:id',protect,deleteTodo)

module.exports = router