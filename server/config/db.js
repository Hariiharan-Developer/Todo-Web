const mongoosh = require('mongoose')

const connectDb = async()=>{
    try {
        let conn = await mongoosh.connect(process.env.MONGO_URI)
        console.log(`Db connected :${conn.connection.name}`.green)
    } catch (error) {
        console.log(`Db :${error.message}`.red.bold)
        process.exit(1)
        
    }
}

module.exports = connectDb