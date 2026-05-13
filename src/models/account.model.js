const mongoose = require('mongoose')
const ledgerModel = require('./ledger.model')

const accountSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true , "Account must be associated with a user!"],
        index : true  // We can find users fastly
    },

    status: {
        type : String,
        uppercase : true,
        enum:{
            values : ["ACTIVE" , "FROZEN" , "CLOSED"],
            message : "Status can be either Active,Frozen or Closed",
        },
        default : "ACTIVE"
    },

    currency:{
        type : String,
        required : true,
        default : "PKR"
    }
},{
    timestamps : true
})

accountSchema.index({ user:1 , status:1 })

accountSchema.methods.getBalance = async function(){

    

}

const accountModel = mongoose.model("account" , accountSchema)

module.exports = {accountModel}