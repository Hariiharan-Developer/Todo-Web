const Todo = require("../model/todo.model")
const asyncHandler =require('express-async-handler')


//GET METHOD:
const getTodo =asyncHandler(async(req,res)=>{
        const todo = await Todo.find({user:req.user.id})
        if(todo.length <= 0){
            res.status(201).json({message:'Todo is Empty , create new Task'})
        }
        res.status(200).json(todo)   
}) 

//CREATE METHOD
const createTodo =asyncHandler(async(req,res)=>{
    const {task,description,completed} = req.body
    if(!task || !description){
        throw new Error('Task & Description required')
        }
        const newTodo = await Todo.create({
            user:req.user.id,
            task,
            description,
            completed
        })
        res.status(200).json({message:'Todo created',newTodo})
}) 

//UPDATE METHOD
const updateTodo =asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {task,description,completed} =req.body

 
        const existTodo = await Todo.findById(id)
        if(!existTodo){
            throw new Error('Task not found')
        }

        if(existTodo.user.toString() !== req.user.id){
            res.status(404)
            throw new Error('Not Authorized')
        }


        const modifyTodo = await Todo.findByIdAndUpdate(id,{
            task,
            description,
            completed
        },{new:true})
        res.status(200).json({message:'todo updated succesfully',modifyTodo})
   
}) 

//DELETE METHOD
const deleteTodo =asyncHandler( async(req,res)=>{
    const {id} = req.params
   
        const existTodo = await Todo.findById(id)
        if(!existTodo){
            throw new Error('Todo not found')
        }
        if(existTodo.user.toString() !== req.user.id){
            res.status(404)
            throw new Error('Not Authorized')
        }
        const removeTodo = await Todo.findByIdAndDelete(id)
        res.status(200).json({message:`Todo deleted ${removeTodo.id}`})
   
})


module.exports ={
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}