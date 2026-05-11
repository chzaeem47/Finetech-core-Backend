const mongoose = require('mongoose')
const { findOneAndDelete, findByIdAndDelete, findOneAndReplace, findByIdAndUpdate, updateMany, updateOne, deleteMany, deleteOne } = require('./transaction.model')

const ledgerSchema = new mongoose.Schema({

    account:{

    type : mongoose.Schema.Types.ObjectId,
    ref : "account",
    required : [true, "Ledger must be associated with an account!"],
    immutable : true,
    index : true

    },

    amount : {
        type : Number,
        immutable : true,
        required : true
    },

    transaction :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "transaction",
        required : true,
        immutable : true,
        index : true

    },

    type :{
        type : String,
        enum:{
            values : ["DEBIT" , "CREDIT"],
            message : "Type can be either Debit or Credit"
        },
        required : true,
        immutable : true
    }

})

async function preventLedgerModified(){
    throw new Error("Ledger entries cannot be Modified or Deleted!")
}

ledgerSchema.pre('findOneAndDelete',preventLedgerModified);
ledgerSchema.pre('findByIdAndDelete',preventLedgerModified);
ledgerSchema.pre('findOneAndReplace',preventLedgerModified);
ledgerSchema.pre('findByIdAndUpdate',preventLedgerModified);
ledgerSchema.pre('updateMany',preventLedgerModified);
ledgerSchema.pre('updateOne',preventLedgerModified);
ledgerSchema.pre('deleteMany',preventLedgerModified);
ledgerSchema.pre('deleteOne',preventLedgerModified);
ledgerSchema.pre('remove',preventLedgerModified);


const ledgerModel = mongoose.model("ledger" , ledgerSchema)

module.exports = ledgerModel

