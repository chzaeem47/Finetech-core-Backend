const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const emailService = require('../services/email.service')
const { accountModel } = require('../models/account.model') 
const mongoose = require('mongoose');
const userModel = require('../models/user.model');

async function createTransaction(req,res){
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        /**
         * VALIDATE USER REQUEST
         */
        const { fromAccount,toAccount,amount,idempotencykey } = req.body 

        if(!fromAccount || !toAccount || !amount || !idempotencykey){
            return res.status(400).json({
                message : "Invalid Request!"
            })
        }
        
        const fromUserAccount = await accountModel.findOne({
            _id : fromAccount 
        }).populate('user')

        const toUserAccount = await accountModel.findOne({
            _id : toAccount 
        }).populate('user')

        if(!toUserAccount || !fromUserAccount ){
            return res.status(400).json({
                message : "Inavlid Account!"
            })
        }

        /**
         * VALIDATE IDEM_POTENCY_KEY
         */

        const isTransactionAlreadyExists = await transactionModel.findOne({
            idempotencykey : idempotencykey
        })

        if(isTransactionAlreadyExists){

            if(isTransactionAlreadyExists.transactionStatus.toLowerCase() == "completed"){
                return res.status(200).json({
                    message : "Transaction Already Proceeded",
                    transaction : isTransactionAlreadyExists
                })
            }
            if(isTransactionAlreadyExists.transactionStatus.toLowerCase() == "pending"){
                return res.status(200).json({
                    message : "Transaction is Processing"
                })
            }
        }

        /**
        * CHECK ACCOUNTS STATUS
        */
        
        if(fromUserAccount.status.toLowerCase() !== "active" || toUserAccount.status.toLowerCase() !== "active"){
            return res.status(400).json({
                message : "Both Accounts must have an active Status!"
            })
        }

        /**
        * CHECK SENDER ACCOUNT BALANCE : 
        */
        const balance = await fromUserAccount.getBalance()

        if(balance < amount){
            return res.status(400).json({
                message : "Insuficient Balance!"
            })
        }

        /**
        * CREATE TRANSACTION : 
        */

        const [transaction] = await transactionModel.create([{
           
            fromAccount,
            toAccount,
            amount,
            idempotencykey,
            transactionStatus : "PENDING",

        }],{session})

        await ledgerModel.create([{
            account : fromAccount,
            amount : amount,
            transaction : transaction._id,
            type : "DEBIT",

        }], {session})

        await ledgerModel.create([{
            account : toAccount,
            amount : amount,
            transaction : transaction._id,
            type : "CREDIT",
        }], {session})


        /**
         * SESSION COMPLETED
        */

        transaction.transactionStatus = "COMPLETED"; 
        await transaction.save({session})

        await session.commitTransaction();

        /**
        * SENDING EMAIL TO RECIEVER AND SENDER
        */
        await emailService.sendTransactionEmail(
        req.user.email, 
        toAccount, 
        req.user.name, 
        amount,
        "DEBIT"
        );

        if (toUserAccount && toUserAccount.user) {
        await emailService.sendTransactionEmail(
        toUserAccount.user.email, 
        fromAccount, 
        toUserAccount.user.name, 
        amount,
        "CREDIT"

        );}

    return res.status(201).json({message : "Transaction Completed Successfully"})

    } catch (error) {

    if (session.inTransaction()) {
        await session.abortTransaction();
    }
        console.error("Transaction Error:", error);
        res.status(500).json({ message: "Transaction failed", error: error.message });

    } finally {
    
    await session.endSession();

    }

}

/**
 * SYSTEM ACCOUNT TRANSACTION FUNCTION
 */

async function createInitialFundTransaction(req,res){
    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {
        const {toAccount , amount , idempotencykey} = req.body

        if(!toAccount || !amount || !idempotencykey ){
            return res.status(400).json({
                message : "Fill al the Fields For Transaction"
            })
        }

        const toUserAccount = await accountModel.findOne({
            _id : toAccount
        })

        if(!toUserAccount){
            return res.status(400).json({message : "Invalid Account!"})
        }

        const fromUserAccount = await accountModel.findOne({
          
            user : req.user._id 
        })

        if(!fromUserAccount){
            return res.status(400).json({
                message : "System Account Not Found!"
            })
        }

        const [transaction] = await transactionModel.create([{
            fromAccount : fromUserAccount._id,
            toAccount,
            amount,
            idempotencykey,
            transactionStatus : "PENDING",
        }], {session})

        await ledgerModel.create([{
            account : fromUserAccount._id,
            amount : amount,
            transaction : transaction._id,
            type : "DEBIT",
        }], {session})

        await ledgerModel.create([{
            account : toAccount,
            amount : amount,
            transaction : transaction._id,
            type : "CREDIT",
        }], {session})

        transaction.transactionStatus = "COMPLETED";
        await transaction.save({session})

        await session.commitTransaction();
        session.endSession();

        await emailService.sendTransactionEmail(
        req.user.email, 
        toAccount, 
        req.user.name, 
        amount
        );

        return res.status(201).json({
            
            message : "Initial fund Transaction Completed",
        })
    } catch (error) {

        res.status(500).json({ message: "Initial funding failed", error: error.message });
    }
}

async function getMyTransactions(req, res) {
    try {
        const myAccount = await accountModel.findOne({
            user: req.user._id
        });

        if (!myAccount) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        const transactions = await transactionModel
            .find({
                $or: [
                    { fromAccount: myAccount._id },
                    { toAccount: myAccount._id }
                ]
            })
            .populate("fromAccount", "userName")
            .populate("toAccount", "userName")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Transactions fetched successfully",
            myAccountId: myAccount._id,
            transactions
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch transactions",
            error: error.message
        });
    }
}

module.exports = { createTransaction, createInitialFundTransaction,getMyTransactions }