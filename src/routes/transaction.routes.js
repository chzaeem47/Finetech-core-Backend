const express = require('express')
const {createTransaction} = require('../controllers/transaction.controller')
const authMiddleWare = require('../middleware/auth.middleware')
const transactionRouter = express.Router();
const transactionController = require('../controllers/transaction.controller')

/**
 * - POST API FOR TRANSACTION
 * - /api/transactions/
 */

transactionRouter.post('/' ,authMiddleWare.authMiddleWare, transactionController.createTransaction , )

/**
* CREATING SYSTEM ACCOUNT ROUTER
* /api/transaction/system/initial-funds
*/

transactionRouter.post('/system/initial-funds' ,authMiddleWare.authSystemUserMiddleWare,transactionController.createInitialFundTransaction)

module.exports = transactionRouter
