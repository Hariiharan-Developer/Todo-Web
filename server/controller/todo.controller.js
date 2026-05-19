//GET METHOD:
const getTodo =async(req,res)=>{
    try {
        res.status(200).json({message:'get todo'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//CREATE METHOD
const createTodo =async(req,res)=>{
    try {
        res.status(200).json({message:'create todo'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//UPDATE METHOD
const updateTodo =async(req,res)=>{
    try {
        res.status(200).json({message:'update todo'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//DELETE METHOD
const deleteTodo =async(req,res)=>{
    try {
        res.status(200).json({message:'delete todo'})
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