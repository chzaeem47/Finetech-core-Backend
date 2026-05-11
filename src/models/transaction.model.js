const mongoose = require('mongoose')    

const transactionSchema = new mongoose.Schema({

    fromAccount:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : true,
        index : true
    },

    toAccount:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : true,
        index : true
    },

    transactionStatus:{
        type: String,
        enum:{
            values : ["PENDING" ,"COMPLETED" ,"REVERSED" ,"FAILED"],
            message : "Status can be either Pending,Completed,Reversed or Failed"
        },
        default : "PENDING"
    },

    amount:{
        type : Number,
        required : true,
        min : [0 , "Transaction Amount cannot be Negative!"]
    },

    idempotencykey:{
        type : String,
        required : true,
        index : true,
        unique : true,
    }
},{
    timestamps : true
})

const transactionModel = mongoose.model("transaction" , transactionSchema)

module.exports = transactionModel