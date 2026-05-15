const { accountModel } = require('../models/account.model');


async function createAccountController(req, res) {
    try {

        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const account = await accountModel.create({
            user: user._id,
            
        });

        return res.status(201).json({
            message: "Bank account created successfully",
            account
            
        });

    } catch (error) {
        console.error("Account Creation Error:", error);
        return res.status(500).json({ 
            message: "Failed to create account", 
            error: error.message 
        });
    }
}

async function getAccountBalanceController(req,res){

    const {accountId} = req.params;

    const account = await accountModel.findOne({
        _id : accountId,
        user : req.user._id
    })

    if(!account){
        return res.status(404).json({
            message : "Account not Found!"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId : account._id,
        balance : balance
    })
}

module.exports = { createAccountController , getAccountBalanceController };