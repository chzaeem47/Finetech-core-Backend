const express = require('express')
const {authMiddleWare} = require('../middleware/auth.middleware')
const {createAccountController} = require('../controllers/accounts.controller')

const accountRouter = express.Router();

accountRouter.post('/' , authMiddleWare , createAccountController)

module.exports = accountRouter