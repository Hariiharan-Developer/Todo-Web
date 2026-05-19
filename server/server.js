const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const router = require('./router/todo.router')
const app = express()

const port = process.env.PORT || 4000

//API Endpoint's :
app.use('/api/v1',router)

//Database CB :
connectDb()

app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.blue)
})
