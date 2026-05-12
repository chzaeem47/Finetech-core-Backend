const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const emailService = require('../services/email.service')
const accountModel = require('../models/account.model')

/**
 * Creating a new Transaction contains 10 steps
 * 1. Validate Request
 * 2. Validate Idempotent key
 * 3. check account status
 * 4. Check sender Account balance by ledger
 * 5. Create transaction (pending)
 * 6. Create debit ledger entry
 * 7. Create credit ledger entry
 * 8. Mark Transacation Completed
 * 9. Commit mongoDB session
 * 10. Send Email
 */


async function createTransaction(req,res){

    /**
     * VALIDATE USER REQUEST
     */
    const { fromAccount,toAccount,amount,idemPotencyKey } = req.body

    if(!fromAccount || toAccount || amount || idemPotencyKey){
        return res.status(400).json({
            message : "Invalid Request!"
        })
    }
    
    const fromUserAccount = await accountModel.findOne({
        _id : fromAccount 
    })

    const toUserAccount = await accountModel.findOne({
        _id : toUserAccount
    })

    if(!toUserAccount || fromUserAccount ){
        return res.status(400).json({
            message : "Inavlid Account!"
        })
    }

    /**
     * VALIDATE IDEM_POTENCY_KEY
     */

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencykey : idemPotencyKey
    })

    if(isTransactionAlreadyExists){

        if(isTransactionAlreadyExists.status.lowercase == "completed"){
            return res.status(200).json({
                message : "Transaction Already Proceeded",
                transaction : isTransactionAlreadyExists
            })
        }

        if(isTransactionAlreadyExists.status.lowercase == "PENDING"){
            return res.status(200).json({
                message : "Transaction is Processing"
            })
        }

        if(isTransactionAlreadyExists.status.lowercase == 'FAILED'){
            return res.status(500).json({
                message : 'Transaction processing Failed!'
            })
        }

        if(isTransactionAlreadyExists.status.lowercase == 'REVERSED'){
            return res.status(500).json({
                message : 'Transaction reversed Plz try Again!'
            })
        }
    }

    /**
    * CHECK ACCOUNTS STATUS
    */

    if(fromUserAccount.status.lowercase || toUserAccount.status.lowercase !== "ACTIVE"){
        return res.status(400).json({
            message : "Both Accounts must have an active Status!"
        })
    }

    /**
     * CHECK SENDER ACCOUNT BALANCE : 
     */

    




    




}

module.exports = {createTransaction}
