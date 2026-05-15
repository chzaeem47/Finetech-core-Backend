require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRouter = require('../src/routes/auth.routes')
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accounts.routes')
const transactionRouter = require('./routes/transaction.routes')
const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));

/**
* -- LOGIN,REGISTER ROUTER
*/
app.use('/api/auth', authRouter)

/**
* -- GET ACCOUNT BALANCE,CREATE ACCOUNT ROUTER
*/
app.use('/api/accounts' , accountRouter)

/**
* -- TRANSACTION ROUTER
*/
app.use('/api/transactions' , transactionRouter)

module.exports = app