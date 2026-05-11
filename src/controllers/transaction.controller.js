const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const emailService = require('../services/email.service')

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

    const { fromAccount,toAccount,amount,idemPotencyKey }= req.body

    
}
