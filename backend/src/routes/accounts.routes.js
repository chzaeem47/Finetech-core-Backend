const express = require('express')
const {authMiddleWare} = require('../middleware/auth.middleware')
const accountController = require('../controllers/accounts.controller')

const accountRouter = express.Router();

///api/accounts

/**
* -- CREATE BANK ACCOUNT CONTROLLER
* -- /api/accounts/ 
*/
accountRouter.get('/', authMiddleWare, accountController.getAllAccountsController)
accountRouter.post('/' , authMiddleWare , accountController.createAccountController)

/**
* -- GET ACCOUNT BALANCE ROUTER
* -- /api/accounts/balance/:accountId
*/

accountRouter.get('/balance/:accountId' , authMiddleWare , accountController.getAccountBalanceController)

accountRouter.get('/me', authMiddleWare, accountController.getMyAccountController)

module.exports = accountRouter