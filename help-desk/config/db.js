const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to the database ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1) //uncaught fatal exit code 
    }
}

module.exports = connectDB