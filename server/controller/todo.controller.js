const Todo = require("../model/todo.model")


//GET METHOD:
const getTodo =async(req,res)=>{
    try {
        const todo = await Todo.find()
        res.status(200).json({message:todo})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//CREATE METHOD
const createTodo =async(req,res)=>{
    const {task,description,completed} = req.body
    if(!task || !description){
        return res.status(400).json({message:'Task & Description required'})
    }
    try {
        const newTodo = await Todo.create({
            task,
            description,
            completed
        })
        res.status(200).json({message:'Todo created',newTodo})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//UPDATE METHOD
const updateTodo =async(req,res)=>{
    const {id} = req.params
    const {task,description,completed} =req.body

    try {
        const existTodo = await Todo.findById(id)
        if(!existTodo){
            return res.status(400).json({message :'Task not found'})
        }
        const modifyTodo = await Todo.findByIdAndUpdate(id,{
            task,
            description,
            completed
        },{new:true})
        res.status(200).json({message:'todo updated succesfully',modifyTodo})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//DELETE METHOD
const deleteTodo =async(req,res)=>{
    const {id} = req.params
    try {
        const existTodo = await Todo.findById(id)
        if(!existTodo){
           return res.status(400).json({message:'Todo not found'})
        }
        const removeTodo = await Todo.findByIdAndDelete(id)
        res.status(200).json({message:`Todo deleted ${removeTodo.id}`})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


module.exports ={
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}