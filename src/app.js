require('dotenv').config()
const express = require('express')
const authRouter = require('../src/routes/auth.routes')
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accounts.routes')
const app = express();


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/accounts' , accountRouter)

module.exports = app