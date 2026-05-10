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

module.exports = { createAccountController };