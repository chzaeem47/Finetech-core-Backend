const express = require('express')
const {authMiddleWare} = require('../middleware/auth.middleware')
const accountController = require('../controllers/accounts.controller')

const accountRouter = express.Router();

accountRouter.post('/' , authMiddleWare , accountController.createAccountController)

/**
 * GET /api/accounts/balance/:accountId
*/

accountRouter.get('/balance/:accountId' , authMiddleWare , accountController.getAccountBalanceController)

module.exports = accountRouter