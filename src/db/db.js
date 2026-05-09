const mongoose = require('mongoose')

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("Connected To DB")

    }catch(err){
        console.log("Error While Connecting to DB" , err)
        process.exit(1)
    }
}

module.exports = connectDB