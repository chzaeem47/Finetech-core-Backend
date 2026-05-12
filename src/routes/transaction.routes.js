const express = require('express')
const {createTransaction} = require('../controllers/transaction.controller')
const authMiddleWare = require('../middleware/auth.middleware')
const transactionRouter = express.Router();

/**
 * - POST API FOR TRANSACTION
 * - /api/transaction/
 */

transactionRouter.post('/' , createTransaction , authMiddleWare.authMiddleWare)

module.exports = transactionRouter
