const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , 'user not fetched']
    },
    task:{
        type:String,
        required:[true , 'please fill task field']
    },
    description:{
        type:String,
        required:[true, 'please fill description field']
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo